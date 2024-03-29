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
#[serde(rename_all = "kebab-case")]
pub enum Requirement {
    ProfileCreated,
    ProfileCompleted,
}

impl Requirement {
    pub fn check_if_met(&self, completion: f64) -> bool {
        match self {
            Requirement::ProfileCreated => completion > 0.0,
            Requirement::ProfileCompleted => completion >= 1.0,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Perk {
    #[serde(alias = "fldUb764dFRV9t2X9", default)]
    pub name: String,
    #[serde(alias = "fldOS7EEgDSOAtnod", default)]
    pub benefit: String,
    #[serde(alias = "fldnkMNnLUxAFu4te", default)]
    pub description: String,
    #[serde(alias = "flddeOtSu7AprqSxi", default)]
    pub price: u64,
    #[serde(
        alias = "fldC2oRsuHtSOvEjY",
        deserialize_with = "deserialize_available",
        default
    )]
    pub available: bool,
    #[serde(alias = "fldL0d6Jw25dtNawv", default, skip_serializing)]
    pub url: String,
    #[serde(alias = "fldLoyiR8D7u7bjwz", default)]
    pub instructions: String,
    #[serde(alias = "fld4lCFQ1jP0fB8k5", default, skip_serializing)]
    pub code: Option<String>,
    #[serde(alias = "fldc4uLRTGBAjauTs", default)]
    pub logo: Vec<AttachmentObject>,
    #[serde(alias = "fldTmpRheSB76mmpK", default)]
    pub banner: Vec<AttachmentObject>,
    #[serde(alias = "fldsxdrpgkULGWEle", default)]
    pub category: Vec<String>,
    #[serde(alias = "fldGZasraOf49CqXy", default)]
    pub requiremets: Vec<Requirement>,
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
        "https://api.airtable.com/v0/{}/{}/{}?returnFieldsByFieldId=true",
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
        "https://api.airtable.com/v0/{}/{}?returnFieldsByFieldId=true",
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
