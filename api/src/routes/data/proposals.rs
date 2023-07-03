use axum::{
    debug_handler,
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use reqwest::StatusCode;
use serde::Deserialize;

use crate::AppState;

#[derive(Debug, Clone, Deserialize)]
struct Params {}

#[debug_handler(state = AppState)]
async fn get_all(
    Query(Params {}): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<(String, String, String)>>, (StatusCode, String)> {
    sqlx::query!(
        r#"
        SELECT
            project_id,
            vendor_id,
            cid
        FROM
            proposals
        "#,
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch proposals: {e}"),
        )
    })
    .map(|proposals| {
        Json(
            proposals
                .into_iter()
                .map(|proposal| (proposal.project_id, proposal.vendor_id, proposal.cid))
                .collect(),
        )
    })
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/", get(get_all))
}
