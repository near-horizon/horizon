use axum::{
    debug_handler,
    extract::{Path, Query, State},
    routing::get,
    Json, Router,
};
use chrono::prelude::*;
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
                format!("Failed to get transactions: {e}"),
            )
        })
        .map(Json)
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "lowercase")]
enum EntityType {
    Projects,
    Vendors,
    Backers,
    Requests,
    Proposals,
    Contributions,
}

pub fn deserialize_date_params<'de, D>(deserializer: D) -> Result<Option<(i64, i64)>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let date_string = String::deserialize(deserializer)?;
    let parts = date_string.split('-').collect::<Vec<&str>>();
    if parts.len() != 3 {
        return Err(serde::de::Error::custom(
            "Date must be in the format YYYY-MM-DD",
        ));
    }
    let year = parts.first().unwrap().parse::<i32>().unwrap();
    let month = parts.get(1).unwrap().parse::<u32>().unwrap();
    let day = parts.last().unwrap().parse::<u32>().unwrap();
    let date = Utc
        .with_ymd_and_hms(year, month, day, 0, 0, 0)
        .single()
        .unwrap_or_else(|| {
            Utc::now()
                .with_hour(0)
                .unwrap()
                .with_minute(0)
                .unwrap()
                .with_second(0)
                .unwrap()
                .with_nanosecond(0)
                .unwrap()
        });

    let from = date.timestamp_nanos();
    let to = date
        .checked_add_signed(chrono::Duration::days(1))
        .unwrap()
        .timestamp_nanos();
    Ok(Some((from, to)))
}

#[derive(Deserialize, Serialize, Debug)]
struct DateParams {
    #[serde(deserialize_with = "deserialize_date_params", default)]
    date: Option<(i64, i64)>,
}

impl EntityType {
    fn to_filter(&self) -> Vec<String> {
        match self {
            EntityType::Projects => vec!["add_project".to_string()],
            EntityType::Vendors => vec!["add_vendor".to_string(), "register_vendor".to_string()],
            EntityType::Backers => {
                vec!["add_investors".to_string(), "register_investor".to_string()]
            }
            EntityType::Requests => vec!["add_request".to_string()],
            EntityType::Proposals => vec!["add_proposal".to_string()],
            EntityType::Contributions => vec!["add_contribution".to_string()],
        }
    }
}

#[debug_handler(state = AppState)]
async fn get_created_entity_count(
    Path(entity_type): Path<EntityType>,
    Query(DateParams { date }): Query<DateParams>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<i64>, (StatusCode, String)> {
    let (from, to) = date.unwrap_or_else(|| {
        let date = Utc::now()
            .with_hour(0)
            .unwrap()
            .with_minute(0)
            .unwrap()
            .with_second(0)
            .unwrap()
            .with_nanosecond(0)
            .unwrap();
        let from = date.timestamp_nanos();
        let to = date
            .checked_add_signed(chrono::Duration::days(1))
            .unwrap()
            .timestamp_nanos();
        (from, to)
    });
    sqlx::query_scalar!(
        r#"
        SELECT COUNT(*)
        FROM transactions
        WHERE
          method_name = ANY($1)
          AND timestamp BETWEEN $2 AND $3
        "#,
        &entity_type.to_filter(),
        from,
        to,
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get transactions: {e}"),
        )
    })
    .map(|result| Json(result.unwrap_or(0)))
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/all", get(get_transactions))
        .route("/count/:entity_type", get(get_created_entity_count))
}
