use axum::{debug_handler, extract::State, routing::get, Json, Router};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Serialize, Deserialize, Debug)]
pub struct Transaction {
    pub id: i32,
    pub hash: String,
    pub signer_id: String,
    pub method_name: String,
    pub args: serde_json::Value,
    pub log: String,
    pub block_hash: String,
    pub timestamp: i64,
}

#[debug_handler(state = AppState)]
pub async fn get_transactions(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<Transaction>>, (StatusCode, String)> {
    sqlx::query_as!(Transaction, "SELECT * FROM transactions ORDER BY id DESC")
            .fetch_all(&pool)
            .await
            .map_err(|e| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Failed to get transactions: {}", e),
                )
            })
            .map(Json)
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/all", get(get_transactions))
}
