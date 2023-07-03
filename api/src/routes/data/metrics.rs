use axum::{
    debug_handler,
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Debug, Clone, Deserialize, Serialize, Default)]
struct CompletionDetails {
    avarage: Option<f64>,
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
) -> Result<Json<CompletionDetails>, (StatusCode, String)> {
    sqlx::query_as!(
        CompletionDetails,
        r#"
        SELECT
            (
                SELECT COUNT(*) as completed
                FROM projects
                WHERE completion >= $1
            ) as completed,
            (
                SELECT AVG(completion) as avarage
                FROM projects
            ) as avarage
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
async fn get_counts(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Counts>, (StatusCode, String)> {
    sqlx::query_as!(
        Counts,
        r#"
        SELECT
            (SELECT COUNT(*) FROM projects) as projects,
            (SELECT COUNT(*) FROM vendors) as vendors,
            (SELECT COUNT(*) FROM requests) as requests,
            (SELECT COUNT(*) FROM proposals) as proposals,
            (SELECT COUNT(*) FROM contributions) as contributions
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
async fn get_avarage_fullfilment(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<i64>, (StatusCode, String)> {
    sqlx::query!(
        r#"
        SELECT
          (contract.timestamp - creation.timestamp) as time,
          contract.timestamp as contract_timestamp,
          creation.timestamp as creation_timestamp
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
                from
                  12
              ) :: json -> 'data' ->> 'cid' = cid
            WHERE
              method_name = 'add_request'
          ) as creation
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
          ) as contract ON creation.project_id = contract.project_id
          AND creation.cid = contract.cid
        "#,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch avarage fullfilment: {e}"),
        )
    })
    .map(|row| {
        let duration = chrono::Duration::nanoseconds(row.time.unwrap_or(0) * 100);
        dbg!(duration);
        let nanos = row.contract_timestamp % 1_000_000_000;
        let secs = row.contract_timestamp / 1_000_000_000;
        let contract = chrono::NaiveDateTime::from_timestamp_opt(secs, nanos as u32).unwrap();
        dbg!(contract.format("%Y-%m-%d %H:%M:%S").to_string());
        let nanos = row.creation_timestamp % 1_000_000_000;
        let secs = row.creation_timestamp / 1_000_000_000;
        let creation = chrono::NaiveDateTime::from_timestamp_opt(secs, nanos as u32).unwrap();
        dbg!(creation.format("%Y-%m-%d %H:%M:%S").to_string());
        Json(duration.num_days())
    })
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", get(completion))
        .route("/counts", get(get_counts))
        .route("/avarage_fullfilment", get(get_avarage_fullfilment))
}
