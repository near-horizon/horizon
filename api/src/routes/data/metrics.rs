use axum::{
    debug_handler,
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use num_traits::ToPrimitive;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

#[derive(Debug, Clone, Deserialize, Serialize, Default)]
struct CompletionDetails {
    average: Option<f64>,
    completed: Option<i64>,
}

#[derive(Debug, Clone, Deserialize)]
struct Params {
    above: Option<f64>,
}

#[debug_handler(state = AppState)]
async fn completion(
    Query(Params { above }): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<CompletionDetails>> {
    sqlx::query_as!(
        CompletionDetails,
        r#"
        SELECT
          (
            SELECT
              COUNT(*) AS completed
            FROM
              projects
            WHERE
              completion >= $1
          ) AS completed,
          (
            SELECT
              AVG(completion) AS average
            FROM
              projects
          ) AS average
        "#,
        above.unwrap_or(0.0) / 100.0,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch completion details: {e}"),
        )
    })
    .map(Json)
}

#[derive(Debug, Clone, Deserialize, Serialize, Default)]
struct Counts {
    projects: Option<i64>,
    vendors: Option<i64>,
    requests: Option<i64>,
    proposals: Option<i64>,
    contributions: Option<i64>,
}

#[debug_handler(state = AppState)]
async fn get_counts(State(AppState { pool, .. }): State<AppState>) -> ApiResult<Json<Counts>> {
    sqlx::query_as!(
        Counts,
        r#"
        SELECT
          (
            SELECT
              COUNT(*)
            FROM
              projects
          ) AS projects,
          (
            SELECT
              COUNT(*)
            FROM
              vendors
          ) AS vendors,
          (
            SELECT
              COUNT(*)
            FROM
              requests
          ) AS requests,
          (
            SELECT
              COUNT(*)
            FROM
              proposals
          ) AS proposals,
          (
            SELECT
              COUNT(*)
            FROM
              contributions
          ) AS contributions
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch counts: {e}"),
        )
    })
    .map(Json)
}

#[debug_handler(state = AppState)]
async fn get_average_fulfillment(
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<i64>> {
    sqlx::query!(
        r#"
        SELECT
          AVG(contract.timestamp - creation.timestamp) AS time
        FROM
          (
            SELECT
              DISTINCT ON (project_id, cid) project_id,
              cid,
              timestamp
            FROM
              requests
              LEFT JOIN transactions ON transactions.args -> 'request' ->> 'project_id' = project_id
              AND SUBSTRING(
                transactions.log
                FROM
                  12
              ) :: json -> 'data' ->> 'cid' = cid
            WHERE
              method_name = 'add_request'
            ORDER BY
              project_id ASC,
              cid ASC,
              timestamp ASC
          ) AS creation
          INNER JOIN (
            SELECT
              DISTINCT ON (project_id, vendor_id, cid) project_id,
              vendor_id,
              cid,
              timestamp
            FROM
              contributions
              LEFT JOIN transactions ON transactions.args ->> 'project_id' = project_id
              AND transactions.args ->> 'vendor_id' = vendor_id
              AND transactions.args ->> 'cid' = cid
            WHERE
              method_name = 'add_contribution'
          ) AS contract ON creation.project_id = contract.project_id
          AND creation.cid = contract.cid
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch average fulfillment: {e}"),
        )
    })
    .map(|row| {
        let time = row.time.expect("No fulfillment data").to_i64().unwrap_or(0);
        let duration = chrono::Duration::nanoseconds(time);
        Json(duration.num_days())
    })
}

#[debug_handler(state = AppState)]
async fn get_average_transactions_per_project(
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<f64>> {
    sqlx::query!(
        r#"
        SELECT
          AVG(count) AS count
        FROM
          (
            SELECT
              COUNT(*) AS count,
              COALESCE(args ->> 'project_id', args ->> 'account_id') AS project_id
            FROM
              transactions
            WHERE
              method_name IN (
                'add_project',
                'edit_project',
                'remove_project',
                'add_founders',
                'remove_founders',
                'add_team',
                'remove_team',
                'add_request',
                'edit_request',
                'remove_request',
                'reject_proposal',
                'add_contribution',
                'remove_contribution',
                'add_contribution_action',
                'complete_contribution',
                'add_vendor_feedback',
                'accept_claim',
                'reject_claim'
              )
            GROUP BY
              COALESCE(args ->> 'project_id', args ->> 'account_id')
          ) AS counts
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch average transactions per project: {e}"),
        )
    })
    .map(|row| {
        let count = row
            .count
            .expect("No transaction data")
            .to_f64()
            .unwrap_or(0f64);
        Json(count)
    })
}

#[debug_handler(state = AppState)]
async fn get_average_project_requests(
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<f64>> {
    sqlx::query!(
        r#"
        SELECT
          AVG(count) AS count
        FROM
          projects
          LEFT JOIN (
            SELECT
              COUNT(*) AS count,
              project_id
            FROM
              requests
            GROUP BY
              project_id
          ) AS counts ON projects.id = counts.project_id
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch average project requests: {e}"),
        )
    })
    .map(|row| {
        let count = row.count.expect("No request data").to_f64().unwrap_or(0f64);
        Json(count)
    })
}

#[derive(Debug, Serialize, Deserialize)]
struct ProjectMau {
    average_without_max: f64,
    average: f64,
}

#[debug_handler(state = AppState)]
async fn get_average_project_mau(
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<ProjectMau>> {
    sqlx::query!(
        r#"
        SELECT
          (
            SELECT
              AVG(userbase) AS count
            FROM
              projects
            WHERE
              userbase < (
                SELECT
                  MAX(userbase)
                FROM
                  projects
              )
          ) AS average_without_max,
          (
            SELECT
              AVG(userbase) AS count
            FROM
              projects
          ) AS average
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch average project mau: {e}"),
        )
    })
    .map(|row| {
        let average_without_max = row
            .average_without_max
            .expect("No project data")
            .to_f64()
            .unwrap_or(0f64);
        let average = row
            .average
            .expect("No project data")
            .to_f64()
            .unwrap_or(0f64);
        Json(ProjectMau {
            average_without_max,
            average,
        })
    })
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", get(completion))
        .route("/counts", get(get_counts))
        .route("/average/fulfillment", get(get_average_fulfillment))
        .route(
            "/average/project/transactions",
            get(get_average_transactions_per_project),
        )
        .route(
            "/average/project/requests",
            get(get_average_project_requests),
        )
        .route("/average/project/mau", get(get_average_project_mau))
}
