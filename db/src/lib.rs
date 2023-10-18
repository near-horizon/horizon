use serde::{Deserialize, Deserializer};
use std::collections::HashSet;
use thiserror::Error;

pub mod backers;
pub mod changes;
pub mod claims;
pub mod contracts;
pub mod contributors;
pub mod credits;
pub mod incentives;
pub mod metrics;
pub mod perks;
pub mod projects;
pub mod proposals;
pub mod requests;
pub mod transactions;

#[derive(Error, Debug)]
pub enum DBError {
    #[error("Target not found")]
    NotFound,
    #[error("Internal server error: {0}")]
    InternalServerError(String),
}

pub type DBResult<T> = Result<T, DBError>;

pub fn set_deserialize<'de, D>(deserializer: D) -> Result<Option<HashSet<String>>, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        return Ok(None);
    }
    let set = s.split(',').map(|s| s.to_string()).collect();
    Ok(Some(set))
}
