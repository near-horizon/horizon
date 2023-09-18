use axum::{
    debug_handler,
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

#[derive(Debug, Clone, Serialize, Deserialize)]
enum ContributionStatus {
    Created,
    Accepted,
    Ongoing,
    Delivered,
    Completed,
    Rejected,
}

#[derive(Debug, Clone, Deserialize)]
struct Params {
    #[serde(default)]
    status: Option<ContributionStatus>,
}

#[debug_handler(state = AppState)]
async fn get_all(
    Query(Params { status }): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<Vec<(String, String, String)>>> {
    let status = if let Some(status) = status {
        serde_json::to_string(&status).map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Could not serialize status: {e}"),
            )
        })?
    } else {
        "".to_string()
    };

    sqlx::query!(
        r#"
        SELECT
          project_id,
          vendor_id,
          cid
        FROM
          contributions
        WHERE
          CASE
            WHEN length($1) > 0 THEN status ? $1
            ELSE true
          END
        "#,
        status,
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch contributions: {e}"),
        )
    })
    .map(|contributions| {
        Json(
            contributions
                .into_iter()
                .map(|contribution| {
                    (
                        contribution.project_id,
                        contribution.vendor_id,
                        contribution.cid,
                    )
                })
                .collect(),
        )
    })
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/", get(get_all))
}
