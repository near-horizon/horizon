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
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (transactions.args->'request'->>'project_id', SUBSTRING(transactions.log from 12)::json->'data'->>'cid')
                        transactions.args->'request'->>'project_id' as project_id,
                        SUBSTRING(transactions.log from 12)::json->'data'->>'cid' as cid,
                        transactions.timestamp
                    FROM transactions
                    WHERE
                        transactions.method_name = 'add_request'
                        AND transactions.log ^@ 'EVENT_JSON:'
                    ORDER BY transactions.args->'request'->>'project_id' ASC, SUBSTRING(transactions.log from 12)::json->'data'->>'cid' ASC, transactions.timestamp ASC
                ) as txs ON requests.project_id = txs.project_id AND requests.cid = txs.cid
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::TimeDesc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (transactions.args->'request'->>'project_id', SUBSTRING(transactions.log from 12)::json->'data'->>'cid')
                        transactions.args->'request'->>'project_id' as project_id,
                        SUBSTRING(transactions.log from 12)::json->'data'->>'cid' as cid,
                        transactions.timestamp
                    FROM transactions
                    WHERE
                        transactions.method_name = 'add_request'
                        AND transactions.log ^@ 'EVENT_JSON:'
                    ORDER BY transactions.args->'request'->>'project_id' ASC, SUBSTRING(transactions.log from 12)::json->'data'->>'cid' ASC, transactions.timestamp DESC
                ) as txs ON requests.project_id = txs.project_id AND requests.cid = txs.cid
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
            Sort::NameAsc => ("", "ORDER BY requests.title ASC"),
            Sort::NameDesc => ("", "ORDER BY requests.title DESC"),
            Sort::RecentAsc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id'), COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid'))
	                    COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') as project_id,
	                    COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') as cid,
	                    transactions.method_name,
	                    transactions.timestamp
                    FROM transactions
                    WHERE
                        COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') IS NOT NULL
                        AND COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') IS NOT NULL
	                    AND transactions.method_name IN ('add_request', 'edit_request')
                    ORDER BY
                        COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') ASC,
                        COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') ASC,
                        transactions.timestamp ASC
                ) as txs ON requests.project_id = txs.project_id AND requests.cid = txs.cid
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::RecentDesc => (
                r#"
                LEFT JOIN (
                    SELECT DISTINCT ON (COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id'), COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid'))
	                    COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') as project_id,
	                    COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') as cid,
	                    transactions.method_name,
	                    transactions.timestamp
                    FROM transactions
                    WHERE
                        COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') IS NOT NULL
                        AND COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') IS NOT NULL
	                    AND transactions.method_name IN ('add_request', 'edit_request')
                    ORDER BY
                        COALESCE(transactions.args->'request'->>'project_id', transactions.args->>'account_id') ASC,
                        COALESCE(transactions.args->>'cid', SUBSTRING(transactions.log FROM 12)::json->'data'->>'cid') ASC,
                        transactions.timestamp DESC
                ) as txs ON requests.project_id = txs.project_id AND requests.cid = txs.cid
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
#[serde(rename_all(deserialize = "lowercase"))]
pub enum RequestType {
    OneTime,
    Short,
    Long,
    FullTime,
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
#[serde(rename_all(deserialize = "lowercase"))]
pub enum PaymentType {
    FlatRate,
    TimeBased,
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
#[serde(rename_all(deserialize = "lowercase"))]
pub enum PaymentSource {
    Credits,
    Other,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Params {
    #[serde(default)]
    pub sort: Sort,
    pub tags: Option<HashSet<String>>,
    #[serde(rename = "type")]
    pub request_type: Option<RequestType>,
    pub payment: Option<PaymentType>,
    pub source: Option<PaymentSource>,
    #[serde(default, deserialize_with = "size_deserialize")]
    pub budget: Option<(u32, u32)>,
    pub by: Option<u64>,
    pub from: Option<u32>,
    pub limit: Option<u32>,
    #[serde(rename = "q")]
    pub search: Option<String>,
}

#[debug_handler(state = AppState)]
pub async fn all_requests(
    Query(params): Query<Params>,
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<(String, String)>>, (StatusCode, String)> {
    let mut builder = sqlx::QueryBuilder::new(
        r#"
        SELECT requests.project_id, requests.cid
        FROM requests
        "#,
    );

    let (join, order_by) = params.sort.get_order_by();

    builder.push(join);

    let mut has_where = false;

    if let Some(tags) = params.tags {
        let tags = tags.into_iter().collect::<Vec<_>>();
        builder.push("WHERE requests.tags ?| ");
        builder.push_bind(tags);
        has_where = true;
    }

    if let Some(request_type) = params.request_type {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("requests.request_type = ");
        builder.push_bind(serde_json::to_string(&request_type).unwrap());
    }

    if let Some(payment) = params.payment {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("requests.payment_type = ");
        builder.push_bind(serde_json::to_string(&payment).unwrap());
    }

    if let Some(source) = params.source {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("requests.source = ");
        builder.push_bind(serde_json::to_string(&source).unwrap());
    }

    if let Some((from, to)) = params.budget {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("requests.budget BETWEEN ");
        builder.push_bind(from as i64);
        builder.push(" AND ");
        builder.push_bind(to as i64);
    }

    if let Some(by) = params.by {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("requests.deadline <= ");
        builder.push_bind(by as i64);
    }

    if let Some(search) = params.search {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push(" WHERE ");
        }
        let search = format!("%{search}%");
        builder.push(" (requests.title ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR requests.project_id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR requests.description ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR requests.cid ILIKE ");
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
            format!("Failed to get requests: {e}"),
        )
    })?;

    Ok(Json({
        let mut seen = HashSet::<(String, String)>::new();
        result
            .into_iter()
            .filter_map(|r| {
                let id: String = r.get("project_id");
                let cid: String = r.get("cid");
                (!seen.contains(&(id.clone(), cid.clone()))).then_some({
                    seen.insert((id.clone(), cid.clone()));
                    (id, cid)
                })
            })
            .collect()
    }))
}

pub fn create_router() -> Router<AppState> {
    Router::new().route("/", get(all_requests))
}
