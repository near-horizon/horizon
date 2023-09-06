use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Thumbnail {
    pub url: String,
    #[serde(default)]
    pub width: u64,
    #[serde(default)]
    pub height: u64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Thumbnails {
    pub small: Thumbnail,
    pub large: Thumbnail,
    pub full: Thumbnail,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AttachmentObject {
    pub id: String,
    pub url: String,
    pub filename: String,
    pub size: u64,
    pub r#type: String,
    #[serde(default)]
    pub width: u64,
    #[serde(default)]
    pub height: u64,
    pub thumbnails: Thumbnails,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Perk {
    #[serde(alias = "Name")]
    pub name: String,
    #[serde(alias = "Benefit", default)]
    pub benefit: String,
    #[serde(alias = "About", default)]
    pub description: String,
    #[serde(alias = "Cost", default)]
    pub price: u64,
    #[serde(
        alias = "Product Readiness",
        deserialize_with = "deserialize_available"
    )]
    pub available: bool,
    #[serde(alias = "URL", default, skip_serializing)]
    pub url: String,
    #[serde(alias = "Claim Instructions", default)]
    pub instructions: String,
    #[serde(alias = "Code", default, skip_serializing)]
    pub code: Option<String>,
    #[serde(alias = "Logo")]
    pub logo: Vec<AttachmentObject>,
    #[serde(alias = "Banner")]
    pub banner: Vec<AttachmentObject>,
    #[serde(alias = "Category", default)]
    pub category: Vec<String>,
}

fn deserialize_available<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    Ok(s == "Yes")
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PerkResponse {
    pub id: String,
    #[serde(alias = "createdTime")]
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
