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
    routes::data::{projects::size_deserialize, set_deserialize, Completion, CompletionPair},
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

pub fn bool_set_deserializer<'de, D>(deserializer: D) -> Result<Option<HashSet<bool>>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let v = String::deserialize(deserializer)?;
    Ok(Some(v.split(',').map(|s| s == "true").collect()))
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Params {
    #[serde(default)]
    pub sort: Sort,
    pub from: Option<u32>,
    #[serde(default, deserialize_with = "bool_set_deserializer")]
    pub verified: Option<HashSet<bool>>,
    #[serde(default, deserialize_with = "bool_set_deserializer")]
    pub active: Option<HashSet<bool>>,
    #[serde(default, alias = "type", deserialize_with = "set_deserialize")]
    pub org_type: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub payment_type: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub work: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "size_deserialize")]
    pub rate: Option<HashSet<(u32, u32)>>,
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
        builder.push(" WHERE vendors.verified = ANY (");
        builder.push_bind(verified.into_iter().collect::<Vec<bool>>());
        builder.push(") ");
        has_where = true;
    }

    if let Some(active) = params.active {
        if !has_where {
            builder.push(" WHERE ");
            has_where = true;
        } else {
            builder.push(" AND ");
        }
        builder.push(" vendors.active = ANY (");
        builder.push_bind(active.into_iter().collect::<Vec<bool>>());
        builder.push(") ");
    }

    if let Some(org_type) = params.org_type {
        if !has_where {
            builder.push(" WHERE ");
            has_where = true;
        } else {
            builder.push(" AND ");
        }
        builder.push(" vendors.vendor_type = ANY (");
        builder.push_bind(org_type.into_iter().collect::<Vec<String>>());
        builder.push(") ");
    }

    if let Some(payment_type) = params.payment_type {
        if !has_where {
            builder.push(" WHERE ");
            has_where = true;
        } else {
            builder.push(" AND ");
        }
        builder.push(" vendors.payments = ANY (");
        builder.push_bind(payment_type.into_iter().collect::<Vec<String>>());
        builder.push(") ");
    }

    if let Some(work) = params.work {
        if !has_where {
            builder.push(" WHERE ");
            has_where = true;
        } else {
            builder.push(" AND ");
        }
        builder.push(" vendors.work = ANY (");
        builder.push_bind(work.into_iter().collect::<Vec<String>>());
        builder.push(") ");
    }

    if let Some(rate) = params.rate {
        if !has_where {
            builder.push(" WHERE ");
            has_where = true;
        } else {
            builder.push(" AND ");
        }
        builder.push(" ( ");
        for (i, (min, max)) in rate.into_iter().enumerate() {
            if i > 0 {
                builder.push(" OR ");
            }
            builder.push(" vendors.rate BETWEEN ");
            builder.push_bind(min as i32);
            builder.push(" AND ");
            builder.push_bind(max as i32);
        }
        builder.push(" ) ");
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
