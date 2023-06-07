use std::collections::{HashMap, HashSet};

use futures::StreamExt;
use horizon::claim::Claim;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde_json::json;
use sqlx::PgPool;

use crate::{empty_args, view_function_call, CONCURRENCY};

async fn get_claim_ids(
    client: &JsonRpcClient,
    account_id: &AccountId,
) -> anyhow::Result<HashSet<(AccountId, AccountId)>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: account_id.clone(),
            method_name: "get_claims".to_string(),
            args: empty_args(),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_claim_details(
    project_id: &AccountId,
    account_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<Claim> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_claim".to_string(),
            args: FunctionArgs::from(
                json!({ "account_id": account_id, "project_id": project_id })
                    .to_string()
                    .into_bytes(),
            ),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

pub async fn get_all_claims(
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> anyhow::Result<HashMap<(AccountId, AccountId), Claim>> {
    let claim_ids = get_claim_ids(client, horizon_account).await?;

    futures::stream::iter(claim_ids.into_iter().map(|(project_id, account_id)| async {
        get_claim_details(&project_id, &account_id, client, horizon_account)
            .await
            .map(|value| ((project_id, account_id), value))
    }))
    .buffer_unordered(CONCURRENCY)
    .collect::<Vec<anyhow::Result<_>>>()
    .await
    .into_iter()
    .try_fold(HashMap::new(), |mut map, result| {
        let (key, value) = result?;
        map.insert(key, value);
        anyhow::Ok::<HashMap<(AccountId, AccountId), Claim>>(map)
    })
}

pub async fn sync_deleted(pool: &PgPool, claims: &HashSet<(String, String)>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    let old_ids = sqlx::query!(
        r#"
        SELECT project_id, account_id
        FROM claims
        "#,
    )
    .fetch_all(&mut tx)
    .await?
    .into_iter()
    .map(|row| (row.project_id, row.account_id))
    .collect::<HashSet<_>>();

    let for_deletion = old_ids.difference(claims).cloned().collect_vec();

    for (project_id, account_id) in for_deletion {
        sqlx::query!(
            "DELETE FROM claims WHERE project_id = $1 AND account_id = $2",
            project_id,
            account_id,
        )
        .execute(&mut tx)
        .await?;
    }

    Ok(tx.commit().await?)
}

pub async fn insert_many(
    pool: &PgPool,
    claims: Vec<((AccountId, AccountId), Claim)>,
) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for ((project_id, account_id), claim) in claims {
        sqlx::query!(
            r#"
            INSERT INTO claims (
              project_id,
              account_id,
              claim
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (project_id, account_id) DO
            UPDATE SET claim = $3
            "#,
            project_id.to_string(),
            account_id.to_string(),
            serde_json::to_value(claim)?,
        )
        .execute(&mut tx)
        .await?;
    }

    Ok(tx.commit().await?)
}
