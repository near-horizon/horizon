use std::collections::{HashMap, HashSet};

use futures::StreamExt;
use horizon::{proposal::Proposal, request::Request};
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;
// use sqlx::PgPool;

use crate::{empty_args, view_function_call, CONCURRENCY};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct FullRequest {
    pub cid: String,
    pub request: Request,
    pub proposals: Vec<Proposal>,
}

pub async fn get_request_ids(
    client: &JsonRpcClient,
    account_id: &AccountId,
) -> anyhow::Result<HashSet<(AccountId, String)>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: account_id.clone(),
            method_name: "get_requests".to_string(),
            args: empty_args(),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_request_details(
    account_id: &AccountId,
    cid: &str,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Request> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_request".to_string(),
            args: FunctionArgs::from(
                json!({ "account_id": account_id, "cid": cid })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_request_proposals(
    account_id: &AccountId,
    cid: &str,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<HashSet<((AccountId, String), AccountId)>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_request_proposals".to_string(),
            args: FunctionArgs::from(
                json!({ "account_id": account_id, "cid": cid })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_proposal_details(
    project_id: &AccountId,
    cid: &str,
    vendor_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Proposal> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_proposal".to_string(),
            args: FunctionArgs::from(
                json!({ "project_id": project_id, "cid": cid, "vendor_id": vendor_id })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_proposals_for_request(
    account_id: &AccountId,
    cid: &str,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Vec<Proposal>> {
    futures::stream::iter(
        get_request_proposals(account_id, cid, client, horizon_account)
            .await?
            .into_iter()
            .map(|(_, vendor_id)| async move {
                get_proposal_details(account_id, cid, &vendor_id, client, horizon_account).await
            }),
    )
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_collect()
}

async fn get_full_request(
    account_id: &AccountId,
    cid: &str,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<FullRequest> {
    let request = get_request_details(account_id, cid, client, horizon_account).await?;
    let proposals = get_proposals_for_request(account_id, cid, client, horizon_account).await?;
    Ok(FullRequest {
        cid: cid.to_string(),
        request,
        proposals,
    })
}

pub async fn get_all_requests(
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<HashMap<(AccountId, String), FullRequest>> {
    let request_ids = get_request_ids(client, horizon_account).await?;

    futures::stream::iter(request_ids.into_iter().map(|(account_id, cid)| async {
        get_full_request(&account_id, &cid, client, horizon_account)
            .await
            .map(|value| ((account_id, cid), value))
    }))
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_fold(HashMap::new(), |mut map, result| {
        let (key, value) = result?;
        map.insert(key, value);
        anyhow::Ok::<HashMap<(AccountId, String), FullRequest>>(map)
    })
}

pub async fn sync_deleted(
    pool: &PgPool,
    requests: &HashSet<(String, String)>,
    proposals: &HashSet<((String, String), String)>,
) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    let old_ids = sqlx::query!(
        r#"
        SELECT project_id, cid, vendor_id
        FROM proposals
        "#,
    )
    .fetch_all(&mut tx)
    .await?
    .into_iter()
    .map(|row| ((row.project_id, row.cid), row.vendor_id))
    .collect::<HashSet<_>>();

    let for_deletion = old_ids.difference(proposals).cloned().collect_vec();

    for ((project_id, cid), vendor_id) in for_deletion {
        sqlx::query!(
            "DELETE FROM proposals WHERE project_id = $1 AND cid = $2 AND vendor_id = $3",
            project_id,
            cid,
            vendor_id,
        )
        .execute(&mut tx)
        .await?;
    }

    let old_ids = sqlx::query!(
        r#"
        SELECT project_id, cid
        FROM requests
        "#,
    )
    .fetch_all(&mut tx)
    .await?
    .into_iter()
    .map(|row| (row.project_id, row.cid))
    .collect::<HashSet<_>>();

    let for_deletion = old_ids.difference(requests).cloned().collect::<Vec<_>>();

    for (project_id, cid) in for_deletion {
        sqlx::query!(
            r#"
            DELETE FROM requests
            WHERE project_id = $1 AND cid = $2
            "#,
            project_id,
            cid
        )
        .execute(&mut tx)
        .await?;
    }

    Ok(tx.commit().await?)
}

pub async fn insert_many(pool: &PgPool, requests: Vec<FullRequest>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for FullRequest {
        cid,
        request,
        proposals,
    } in requests
    {
        sqlx::query!(
            r#"
            INSERT INTO requests (
                project_id,
                cid,
                title,
                description,
                open,
                request_type,
                payment_type,
                tags,
                source,
                deadline,
                budget
            )
            VALUES (
                $1, $2, $3, $4, $5, $6,
                $7, $8, $9, $10, $11
            )
            ON CONFLICT (project_id, cid) DO
            UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                open = EXCLUDED.open,
                request_type = EXCLUDED.request_type,
                payment_type = EXCLUDED.payment_type,
                tags = EXCLUDED.tags,
                source = EXCLUDED.source,
                deadline = EXCLUDED.deadline,
                budget = EXCLUDED.budget;
            "#,
            request.project_id.to_string(),
            cid,
            request.title,
            request.description,
            request.open,
            serde_json::to_string(&request.request_type)?,
            serde_json::to_string(&request.payment_type)?,
            &request.tags.iter().cloned().collect_vec(),
            serde_json::to_string(&request.source)?,
            request.deadline as i64,
            request.budget as i64,
        )
        .execute(&mut tx)
        .await?;

        for proposal in proposals {
            sqlx::query!(
                r#"
                INSERT INTO proposals (
                    project_id,
                    cid,
                    vendor_id,
                    title,
                    description,
                    start_date,
                    end_date,
                    price,
                    proposal_type,
                    payment_type,
                    payment_source
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6,
                    $7, $8, $9, $10, $11
                )
                ON CONFLICT (project_id, cid, vendor_id) DO
                UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    start_date = EXCLUDED.start_date,
                    end_date = EXCLUDED.end_date,
                    price = EXCLUDED.price,
                    proposal_type = EXCLUDED.proposal_type,
                    payment_type = EXCLUDED.payment_type,
                    payment_source = EXCLUDED.payment_source;
                "#,
                proposal.request_id.0.to_string(),
                cid,
                proposal.vendor_id.to_string(),
                proposal.title,
                proposal.description,
                proposal.start_date as i64,
                proposal.end_date as i64,
                proposal.price as i64,
                serde_json::to_string(&proposal.proposal_type)?,
                serde_json::to_string(&proposal.payment_type)?,
                serde_json::to_string(&proposal.payment_source)?,
            )
            .execute(&mut tx)
            .await?;
        }
    }

    Ok(tx.commit().await?)
}
