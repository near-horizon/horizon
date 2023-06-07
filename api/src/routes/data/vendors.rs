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

use crate::{
    routes::data::{Completion, CompletionPair},
    AppState,
};

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
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (transactions.args->>'account_id') transactions.args->>'account_id' as account_id, transactions.timestamp
                    FROM transactions
                    WHERE transactions.method_name = 'register_vendor' OR transactions.method_name = 'add_vendor'
                    ORDER BY transactions.args->>'account_id' ASC, transactions.timestamp ASC
                ) as txs ON vendors.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::TimeDesc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (transactions.args->>'account_id') transactions.args->>'account_id' as account_id, transactions.timestamp
                    FROM transactions
                    WHERE transactions.method_name = 'register_vendor' OR transactions.method_name = 'add_vendor'
                    ORDER BY transactions.args->>'account_id' ASC, transactions.timestamp DESC
                ) as txs ON vendors.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
            Sort::NameAsc => ("", "ORDER BY vendors.name ASC"),
            Sort::NameDesc => ("", "ORDER BY vendors.name DESC"),
            Sort::RecentAsc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id'))
	                    COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') as account_id, transactions.method_name, transactions.timestamp
                    FROM transactions
                    WHERE
	                    COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') IS NOT NULL
	                    AND transactions.method_name IN ('add_vendor', 'edit_vendor', 'register_vendor', 'add_proposal', 'accept_contribution')
                    ORDER BY COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') ASC, transactions.timestamp ASC
                ) as txs ON vendors.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::RecentDesc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id'))
	                    COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') as account_id, transactions.method_name, transactions.timestamp
                    FROM transactions
                    WHERE
	                    COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') IS NOT NULL
	                    AND transactions.method_name IN ('add_vendor', 'edit_vendor', 'register_vendor', 'add_proposal', 'accept_contribution')
                    ORDER BY COALESCE(transactions.args->>'account_id', transactions.args->>'vendor_id', transactions.args->'proposal'->>'vendor_id') ASC, transactions.timestamp DESC
                ) as txs ON vendors.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Params {
    #[serde(default)]
    pub sort: Sort,
    pub from: Option<u32>,
    pub verified: Option<bool>,
    pub limit: Option<u32>,
    #[serde(rename = "q")]
    pub search: Option<String>,
}

#[debug_handler(state = AppState)]
pub async fn all_vendors(
    Query(params): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<String>>, (StatusCode, String)> {
    let mut builder = sqlx::QueryBuilder::new(
        r#"
        SELECT vendors.id
        FROM vendors
        "#,
    );

    let (join, order_by) = params.sort.get_order_by();

    builder.push(join);

    let mut has_where = false;

    if let Some(verified) = params.verified {
        builder.push(" WHERE vendors.verified = ");
        builder.push_bind(verified);
        has_where = true;
    }

    if let Some(search) = params.search {
        let search = format!("%{search}%");
        if !has_where {
            builder.push(" WHERE ");
        } else {
            builder.push(" AND ");
        }
        builder.push(" (vendors.name ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR vendors.id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR vendors.tagline ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR vendors.description ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR vendors.services ILIKE ");
        builder.push_bind(search);
        builder.push(") ");
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
            format!("Failed to get vendors: {e}"),
        )
    })?;

    Ok(Json({
        let mut seen = HashSet::<String>::new();
        result
            .into_iter()
            .filter_map(|r| {
                let id: String = r.get("id");
                (!seen.contains(&id)).then_some({
                    seen.insert(id.clone());
                    id
                })
            })
            .collect()
    }))
}

#[debug_handler(state = AppState)]
async fn get_completion(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Completion>, (StatusCode, String)> {
    let list = sqlx::query_as!(
        CompletionPair,
        r#"
        SELECT vendors.id, vendors.completion
        FROM vendors
        ORDER BY vendors.completion DESC
        "#
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get vendor completions: {e}"),
        )
    })?;

    let avg = list.iter().map(|c| c.completion).sum::<f64>() / list.len() as f64;

    Ok(Json(Completion { avg, list }))
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", get(all_vendors))
        .route("/completion", get(get_completion))
}
