use axum::{debug_handler, extract::State, routing::get, Json, Router};
use reqwest::StatusCode;

use crate::AppState;

#[debug_handler(state = AppState)]
async fn total_raised(State(state): State<AppState>) -> Result<Json<u64>, (StatusCode, String)> {
    let response = state
        .client
        .get(state.atlas_route)
        .bearer_auth(&state.atlas_auth)
        .send()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to get total supply: {}", e),
            )
        })?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to deserialize total supply: {}", e),
            )
        })?;
    let Some(fields) = response.get("fields") else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Missing fields in total supply response".to_string(),
        ));
    };
    let Some(total_fundraise) = fields.get("Total Fundraise") else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Missing total supply in total supply response".to_string(),
        ));
    };
    let Some(total_fundraise) = total_fundraise.as_u64() else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Invalid total supply in total supply response".to_string(),
        ));
    };
    Ok(Json(total_fundraise))
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/total-raised", get(total_raised))
}
