use std::collections::HashSet;

use axum::{
    debug_handler,
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use sqlx::Row;

use crate::AppState;

pub fn size_deserialize<'de, D>(deserializer: D) -> Result<Option<(u32, u32)>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        return Ok(None);
    }
    let parts: Vec<_> = s.split('-').collect();
    if parts.is_empty() {
        return Ok(None);
    }
    let Some(from) = parts.first() else {
        return Ok(None);
    };
    let Some(to) = parts.get(1) else {
        return Ok(None);
    };
    let Ok(from) = from.parse::<u32>() else {
        return Ok(None);
    };
    let Ok(to) = to.parse::<u32>() else {
        return Ok(None);
    };
    if from > to {
        return Ok(None);
    }
    Ok(Some((from, to)))
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy, Default)]
#[serde(rename_all = "lowercase")]
pub enum Sort {
    TimeAsc,
    #[default]
    TimeDesc,
    NameAsc,
    NameDesc,
    RecentAsc,
    RecentDesc,
}

impl Sort {
    pub fn get_order_by(&self) -> (&'static str, &'static str) {
        match self {
            Sort::TimeAsc => (
                "",
                "ORDER BY COALESCE(claims.claim->'Sent'->>'timestamp', claims.claim->>'Accepted', claims.claim->>'Rejected')::bigint ASC",
            ),
            Sort::TimeDesc => (
                "",
                "ORDER BY COALESCE(claims.claim->'Sent'->>'timestamp', claims.claim->>'Accepted', claims.claim->>'Rejected')::bigint DESC",
            ),
            Sort::NameAsc => ("", "ORDER BY claims.project_id ASC, claims.account_id ASC"),
            Sort::NameDesc => ("", "ORDER BY claims.project_id DESC, claims.account_id DESC"),
            Sort::RecentAsc => (
                "",
                "ORDER BY COALESCE(claims.claim->'Sent'->>'timestamp', claims.claim->>'Accepted', claims.claim->>'Rejected')::bigint ASC",
            ),
            Sort::RecentDesc => (
                "",
                "ORDER BY COALESCE(claims.claim->'Sent'->>'timestamp', claims.claim->>'Accepted', claims.claim->>'Rejected')::bigint DESC",
            ),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
#[serde(rename_all(deserialize = "lowercase"))]
pub enum Status {
    Sent,
    Accepted,
    Rejected,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Params {
    #[serde(default)]
    pub sort: Sort,
    pub status: Option<Status>,
    #[serde(default, deserialize_with = "size_deserialize")]
    pub time: Option<(u32, u32)>,
    pub from: Option<u32>,
    pub limit: Option<u32>,
    #[serde(rename = "q")]
    pub search: Option<String>,
}

#[debug_handler(state = AppState)]
pub async fn all_claims(
    Query(params): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<(String, String)>>, (StatusCode, String)> {
    let mut builder = sqlx::QueryBuilder::new(
        r#"
        SELECT claims.project_id, claims.account_id
        FROM claims
        "#,
    );

    let (join, order_by) = params.sort.get_order_by();

    builder.push(join);

    let mut has_where = false;

    if let Some(status) = params.status {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("claims.status = ");
        builder.push_bind(serde_json::to_string(&status).unwrap());
    }

    if let Some((from, to)) = params.time {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("COALESCE(claims.claim->'Sent'->>'timestamp', claims.claim->>'Accepted', claims.claim->>'Rejected')::int BETWEEN ");
        builder.push_bind(from as i32);
        builder.push(" AND ");
        builder.push_bind(to as i32);
    }

    if let Some(search) = params.search {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
        }
        let search = format!("%{}%", search);
        builder.push("claims.project_id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR claims.account_id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR COALESCE(claims.claim->'Sent'->>'message', '') ILIKE ");
        builder.push_bind(search);
    }

    builder.push(format!(" {order_by}"));

    if let Some(limit) = params.limit {
        builder.push(" LIMIT ");
        builder.push_bind(limit as i32);
    }

    if let Some(from) = params.from {
        builder.push(" OFFSET ");
        builder.push_bind(from as i32);
    }

    let result = builder.build().fetch_all(&pool).await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get claims: {}", e),
        )
    })?;

    Ok(Json({
        let mut seen = HashSet::<(String, String)>::new();
        result
            .into_iter()
            .filter_map(|r| {
                let project_id: String = r.get("project_id");
                let account_id: String = r.get("account_id");
                (!seen.contains(&(project_id.clone(), account_id.clone()))).then_some({
                    seen.insert((project_id.clone(), account_id.clone()));
                    (project_id, account_id)
                })
            })
            .collect()
    }))
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/", get(all_claims))
}
