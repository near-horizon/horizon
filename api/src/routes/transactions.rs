use axum::{
    debug_handler,
    extract::{Path, Query, State},
    routing::get,
    Json, Router,
};
use chrono::prelude::*;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

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
    pub success: bool,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Type {
    Projects,
    Contributors,
    Backers,
    Requests,
    Proposals,
    Contributions,
    Incentives,
}

impl Type {
    pub fn to_filter(&self) -> Vec<String> {
        match self {
            Type::Projects => vec!["add_project".to_string()],
            Type::Contributors => vec!["register_vendor".to_string()],
            Type::Backers => vec!["add_investors".to_string(), "register_investor".to_string()],
            Type::Requests => vec!["add_request".to_string()],
            Type::Proposals => vec!["add_proposal".to_string()],
            Type::Contributions => vec![
                "add_contribution".to_string(),
                "accept_contributon".to_string(),
                "reject_contribution".to_string(),
                "add_contribution_action".to_string(),
                "deliver_contribution".to_string(),
                "complete_contribution".to_string(),
            ],
            Type::Incentives => vec!["add_incentive".to_string()],
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct QueryParams {
    #[serde(default)]
    pub from: Option<i64>,
    #[serde(default)]
    pub limit: Option<i64>,
    #[serde(default)]
    pub entity_type: Option<Type>,
}

#[debug_handler(state = AppState)]
pub async fn get_transactions(
    Query(QueryParams {
        from,
        limit,
        entity_type,
    }): Query<QueryParams>,
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<Vec<Transaction>>> {
    let limit = limit.unwrap_or(10_000);
    let offset = from.unwrap_or(0);
    if let Some(entity_type) = entity_type {
        let filter = entity_type.to_filter();
        sqlx::query_as!(
            Transaction,
            r#"
            SELECT
              *
            FROM
              transactions
            WHERE
              method_name = ANY($1)
            ORDER BY
              id DESC
            LIMIT
              $2 
            OFFSET
              $3
            "#,
            &filter,
            limit,
            offset,
        )
        .fetch_all(&pool)
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to get transactions: {e}"),
            )
        })
        .map(Json)
    } else {
        sqlx::query_as!(
            Transaction,
            "SELECT * FROM transactions ORDER BY id DESC LIMIT $1 OFFSET $2",
            limit,
            offset
        )
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

    let from = date.timestamp_nanos_opt().unwrap();
    let to = date
        .checked_add_signed(chrono::Duration::days(1))
        .unwrap()
        .timestamp_nanos_opt()
        .unwrap();
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
) -> ApiResult<Json<i64>> {
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
        let from = date.timestamp_nanos_opt().unwrap();
        let to = date
            .checked_add_signed(chrono::Duration::days(1))
            .unwrap()
            .timestamp_nanos_opt()
            .unwrap();
        (from, to)
    });
    sqlx::query_scalar!(
        r#"
        SELECT
          COUNT(*)
        FROM
          transactions
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

#[derive(Deserialize, Serialize, Debug)]
struct Stats {
    projects: Option<i64>,
    vendors: Option<i64>,
    backers: Option<i64>,
    requests: Option<i64>,
    proposals: Option<i64>,
    contributions: Option<i64>,
}

#[debug_handler(state = AppState)]
async fn get_stats(State(AppState { pool, .. }): State<AppState>) -> ApiResult<Json<Stats>> {
    sqlx::query_as!(
        Stats,
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
              investors
          ) AS backers,
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
            format!("Failed to get projects: {e}"),
        )
    })
    .map(Json)
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/all", get(get_transactions))
        .route("/count/:entity_type", get(get_created_entity_count))
        .route("/stats", get(get_stats))
}
