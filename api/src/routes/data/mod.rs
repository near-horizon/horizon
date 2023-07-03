use std::collections::HashSet;

use axum::Router;
use serde::{Deserialize, Serialize};

use crate::AppState;

pub mod claims;
pub mod contributions;
pub mod credits;
pub mod investors;
pub mod metrics;
pub mod projects;
pub mod proposals;
pub mod requests;
pub mod vendors;

pub fn set_deserialize<'de, D>(deserializer: D) -> Result<Option<HashSet<String>>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        return Ok(None);
    }
    let set = s.split(',').map(|s| s.to_string()).collect();
    Ok(Some(set))
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct CompletionPair {
    id: String,
    completion: f64,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Completion {
    avg: f64,
    list: Vec<CompletionPair>,
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/claims", claims::create_router())
        .nest("/contributions", contributions::create_router())
        .nest("/credits", credits::create_router())
        .nest("/investors", investors::create_router())
        .nest("/metrics", metrics::create_router())
        .nest("/projects", projects::create_router())
        .nest("/proposals", proposals::create_router())
        .nest("/requests", requests::create_router())
        .nest("/vendors", vendors::create_router())
}
