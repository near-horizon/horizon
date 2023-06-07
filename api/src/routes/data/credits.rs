use axum::{
    debug_handler,
    extract::{Path, State},
    routing::get,
    Json, Router,
};
use near_account_id::AccountId;
use reqwest::StatusCode;

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
            format!("Failed to get balance: {}", e),
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
            format!("Failed to get balance: {}", e),
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
            format!("Failed to get credit applications: {}", e),
        )
    })
    .map(|result| Json(result.into_iter().map(|r| r.id).collect()))
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/projects/:account_id/balance", get(get_projects_balance))
        .route("/vendors/:account_id/balance", get(get_vendors_balance))
        .route("/applications", get(get_credit_applications))
}
