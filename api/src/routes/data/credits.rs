use axum::{
    debug_handler,
    extract::{Path, State},
    routing::get,
    Json, Router,
};
use near_account_id::AccountId;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::AppState;

#[debug_handler(state = AppState)]
async fn get_projects_balance(
    Path(account_id): Path<AccountId>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<i64>, (StatusCode, String)> {
    sqlx::query!(
        r#"
        SELECT balance
        FROM projects
        WHERE 
          projects.credits
          AND projects.id = $1
        "#,
        account_id.to_string(),
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get balance: {e}"),
        )
    })
    .map(|result| Json(result.balance))
}

#[debug_handler(state = AppState)]
async fn get_vendors_balance(
    Path(account_id): Path<AccountId>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<i64>, (StatusCode, String)> {
    sqlx::query!(
        r#"
        SELECT balance
        FROM vendors
        WHERE
          vendors.credits
          AND vendors.id = $1
        "#,
        account_id.to_string(),
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get balance: {e}"),
        )
    })
    .map(|result| Json(result.balance))
}

#[debug_handler(state = AppState)]
async fn get_credit_applications(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<String>>, (StatusCode, String)> {
    sqlx::query!(
        r#"
        SELECT projects.id
        FROM projects
        LEFT JOIN (
          SELECT DISTINCT ON (transactions.args->>'account_id')
            transactions.args->>'account_id' AS project_id,
            transactions.timestamp AS timestamp
          FROM transactions
          WHERE transactions.method_name = 'apply_for_program'
          ORDER BY 
            transactions.args->>'account_id' DESC,
            transactions.timestamp DESC
        ) as txs ON txs.project_id = projects.id
        WHERE
          (projects.application ILIKE '%Submitted%' AND projects.application NOT ILIKE '%NotSubmitted%')
          OR projects.application ILIKE '%Rejected%'
        ORDER BY txs.timestamp DESC
        "#,
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get credit applications: {e}"),
        )
    })
    .map(|result| Json(result.into_iter().map(|r| r.id).collect()))
}

#[derive(Deserialize, Serialize, Debug)]
struct Transfer {
    sender: String,
    receiver: String,
    amount: i64,
    timestamp: i64,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "lowercase")]
enum TransferType {
    Sent,
    Received,
}

#[debug_handler(state = AppState)]
async fn get_credit_transfers(
    Path((account_id, tranfer_type)): Path<(AccountId, TransferType)>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<Transfer>>, (StatusCode, String)> {
    sqlx::query_as!(
        Transfer,
        r#"
        SELECT 
          contributions.project_id AS sender,
          contributions.vendor_id AS receiver,
          contributions.price AS amount,
          transactions.timestamp AS timestamp
        FROM 
          contributions
          LEFT JOIN transactions ON contributions.project_id = transactions.args->>'project_id'
          AND contributions.vendor_id = transactions.args->>'vendor_id'
          AND contributions.cid = transactions.args->>'cid'
        WHERE 
          contributions.status ? 'Completed'
          AND transactions.method_name = 'complete_contribution'
          AND CASE 
            WHEN $2 THEN contributions.project_id = $1
            ELSE contributions.vendor_id = $1
          END
        ORDER BY 
          transactions.timestamp DESC
        "#,
        account_id.to_string(),
        matches!(tranfer_type, TransferType::Sent),
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get credit transfers for {account_id}: {e}"),
        )
    })
    .map(Json)
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/projects/:account_id/balance", get(get_projects_balance))
        .route("/vendors/:account_id/balance", get(get_vendors_balance))
        .route("/applications", get(get_credit_applications))
        .route(
            "/:account_id/transfers/:transfer_type",
            get(get_credit_transfers),
        )
}
