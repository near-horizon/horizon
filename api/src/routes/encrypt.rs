use axum::{
    debug_handler,
    extract::{Path, State},
    http::HeaderMap,
    routing::post,
    Json, Router,
};
use near_account_id::AccountId;
use reqwest::StatusCode;
use serde_json::json;

use crate::{auth::authorize, AppState, PrivateData};

#[debug_handler(state = AppState)]
pub async fn encrypt(
    headers: HeaderMap,
    Path(project_id): Path<AccountId>,
    State(state): State<AppState>,
    Json(private_data): Json<PrivateData>,
) -> Result<Json<PrivateData>, (StatusCode, String)> {
    authorize(
        headers,
        &json!(private_data).to_string(),
        project_id,
        state.clone(),
    )
    .await?;
    Ok(Json(private_data.encrypt(&state.key)))
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/:account_id", post(encrypt))
}
