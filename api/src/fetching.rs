use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Perk {
    pub name: String,
    pub description: String,
    pub price: u64,
    pub available: bool,
    pub url: String,
    pub code: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PerkResponse {
    pub id: String,
    pub created_time: String,
    pub fields: Perk,
}

pub async fn get_perk(
    AppState {
        client,
        airtable_config,
        ..
    }: AppState,
    perk_id: String,
) -> ApiResult<Perk> {
    let url = format!(
        "https://api.airtable.com/v0/{}/{}/{}",
        airtable_config.base_id, airtable_config.table_name, perk_id,
    );

    let res = client
        .get(&url)
        .header(
            "Authorization",
            format!("Bearer {}", airtable_config.api_key),
        )
        .send()
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if !res.status().is_success() {
        return Err((
            res.status(),
            format!("Failed to get perk: {:?}", res.status()),
        ));
    }

    res.json::<PerkResponse>()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Could not deserialize perk: {}", e),
            )
        })
        .map(|r| r.fields)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PerksListResponse {
    pub records: Vec<PerkResponse>,
}

pub async fn get_perks(
    AppState {
        client,
        airtable_config,
        ..
    }: AppState,
) -> ApiResult<Vec<PerkResponse>> {
    let url = format!(
        "https://api.airtable.com/v0/{}/{}",
        airtable_config.base_id, airtable_config.table_name,
    );

    let res = client
        .get(&url)
        .header(
            "Authorization",
            format!("Bearer {}", airtable_config.api_key),
        )
        .send()
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if !res.status().is_success() {
        return Err((
            res.status(),
            format!("Failed to get perks: {:?}", res.status()),
        ));
    }

    res.json::<PerksListResponse>()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Could not deserialize list: {}", e),
            )
        })
        .map(|r| r.records)
}
