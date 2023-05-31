use std::collections::HashSet;

use futures::StreamExt;
use horizon::contribution::Contribution;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde_json::json;
use sqlx::PgPool;

use crate::{project::Project, view_function_call, FetchAll, CONCURRENCY};

async fn get_project_contributions(
    account_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<HashSet<(AccountId, AccountId)>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_project_contributions".to_string(),
            args: FunctionArgs::from(json!({ "account_id": account_id }).to_string().into_bytes()),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_contribution_history(
    project_id: &AccountId,
    vendor_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<HashSet<String>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_contribution_history".to_string(),
            args: FunctionArgs::from(
                json!({ "project_id": project_id, "vendor_id": vendor_id })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_contribution_details(
    project_id: &AccountId,
    vendor_id: &AccountId,
    cid: &str,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Contribution> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_contribution".to_string(),
            args: FunctionArgs::from(
                json!({ "project_id": project_id, "vendor_id": vendor_id, "cid": cid })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_project_contribution_histories(
    account_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Vec<(AccountId, HashSet<String>)>> {
    futures::stream::iter(
        get_project_contributions(account_id, client, horizon_account)
            .await?
            .into_iter()
            .map(|(_, vendor_id)| async move {
                get_contribution_history(account_id, &vendor_id, client, horizon_account)
                    .await
                    .map(|cids| (vendor_id, cids))
            }),
    )
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_collect()
}

async fn get_history_details(
    account_id: &AccountId,
    histories: &[(AccountId, HashSet<String>)],
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Vec<Contribution>> {
    futures::stream::iter(histories.iter().flat_map(|(vendor_id, cids)| {
        cids.iter().map(move |cid| async move {
            get_contribution_details(account_id, vendor_id, cid, client, horizon_account).await
        })
    }))
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_collect()
}

pub async fn get_all_contributions(
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Vec<Contribution>> {
    let accounts = Project::get_ids(client, horizon_account).await?;
    let histories: Vec<_> = futures::stream::iter(accounts.iter().map(|account_id| async move {
        get_project_contribution_histories(account_id, client, horizon_account)
            .await
            .map(|histories| (account_id.clone(), histories))
    }))
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_collect()?;

    let contributions: Vec<Vec<_>> =
        futures::stream::iter(histories.iter().map(|(project_id, histories)| async move {
            get_history_details(project_id, histories, client, horizon_account).await
        }))
        .buffer_unordered(CONCURRENCY)
        .collect::<Vec<anyhow::Result<_>>>()
        .await
        .into_iter()
        .try_collect()?;

    Ok(contributions.into_iter().flatten().collect())
}

pub async fn insert_many(pool: &PgPool, contributions: Vec<Contribution>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for contribution in contributions {
        sqlx::query!(
            r#"
            INSERT INTO contributions (
                project_id,
                cid,
                vendor_id,
                status,
                vendor_feedback,
                project_feedback,
                price
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )
            ON CONFLICT (project_id, cid, vendor_id) DO
            UPDATE SET
                status = EXCLUDED.status,
                vendor_feedback = EXCLUDED.vendor_feedback,
                project_feedback = EXCLUDED.project_feedback,
                price = EXCLUDED.price;
            "#,
            contribution.proposal_id.0 .0.to_string(),
            contribution.proposal_id.0 .1,
            contribution.proposal_id.1.to_string(),
            serde_json::to_value(contribution.status)?,
            contribution.vendor_feedback,
            contribution.project_feedback,
            contribution.price as i64
        )
        .execute(&mut tx)
        .await?;

        for action in contribution.actions {
            sqlx::query!(
                r#"
                INSERT INTO contribution_actions (
                    project_id,
                    cid,
                    vendor_id,
                    description,
                    start_date,
                    end_date
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6
                )
                ON CONFLICT (project_id, cid, vendor_id) DO
                UPDATE SET
                    description = EXCLUDED.description,
                    start_date = EXCLUDED.start_date,
                    end_date = EXCLUDED.end_date;
                "#,
                contribution.proposal_id.0 .0.to_string(),
                contribution.proposal_id.0 .1,
                contribution.proposal_id.1.to_string(),
                action.description,
                action.start_date as i64,
                action.end_date.map(|d| d as i64)
            )
            .execute(&mut tx)
            .await?;
        }
    }

    Ok(tx.commit().await?)
}
