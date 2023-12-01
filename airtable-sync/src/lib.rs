use futures::StreamExt;
use itertools::Itertools;
use serde::{Deserialize, Serialize};

pub mod contributors;
pub mod projects;

pub fn ensure_env(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| panic!("{name} must be set"))
}

pub fn default_headers() -> reqwest::header::HeaderMap {
    let token = ensure_env("AIRTABLE_ACCESS_TOKEN");
    let bearer_token = format!("Bearer {}", token);
    let mut headers = reqwest::header::HeaderMap::new();
    let mut bearer_value =
        reqwest::header::HeaderValue::from_str(&bearer_token).expect("Bearer token is invalid");
    bearer_value.set_sensitive(true);
    headers.insert(reqwest::header::AUTHORIZATION, bearer_value);
    let content_type_value = reqwest::header::HeaderValue::from_str("application/json")
        .expect("Content-Type is invalid");
    headers.insert(reqwest::header::CONTENT_TYPE, content_type_value);
    headers
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ProjectFields {
    #[serde(rename = "Project name", skip_serializing_if = "String::is_empty")]
    pub name: String,
    #[serde(rename = "Horizon Founder Accounts")]
    pub founders: String,
    #[serde(rename = "Email", skip_serializing_if = "String::is_empty")]
    pub email: String,
    #[serde(rename = "NEAR")]
    pub id: String,
    #[serde(rename = "Horizon Verticals")]
    pub verticals: Vec<String>,
    #[serde(rename = "Horizon Stage")]
    pub stage: String,
    #[serde(rename = "Horizon Location")]
    pub location: String,
    #[serde(rename = "Source")]
    pub source: Vec<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct VendorFields {
    #[serde(rename(serialize = "NEAR"))]
    pub id: String,
    #[serde(rename(serialize = "Partner Name"))]
    pub name: String,
    #[serde(rename(serialize = "Email"), skip_serializing_if = "String::is_empty")]
    pub email: String,
    #[serde(rename(serialize = "Horizon Founder Accounts"))]
    pub founders: String,
    #[serde(rename(serialize = "Vendor type"))]
    pub vendor_type: String,
    #[serde(rename(serialize = "Payment"))]
    pub payments: Vec<String>,
    #[serde(rename(serialize = "Source"))]
    pub source: Vec<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UpsertFields<T>
where
    T: Serialize + std::fmt::Debug,
{
    pub fields: T,
}

pub async fn upsert<T>(client: &reqwest::Client, url: &str, records: &[T]) -> anyhow::Result<()>
where
    T: Serialize + std::fmt::Debug,
{
    for records_batch in records.chunks(10) {
        let response = client
            .patch(url)
            .json(&serde_json::json!({
                "records": records_batch.iter().map(|fields| UpsertFields { fields }).collect::<Vec<_>>(),
                "typecast": true,
                "performUpsert": {
                    "fieldsToMergeOn": ["NEAR"],
                }
            }))
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;
        if let Some(obj) = response.as_object() {
            if obj.contains_key("error") {
                eprintln!("{:#?}", response);
            }
        }
    }
    Ok(())
}

#[derive(Debug)]
pub struct RecordWithIDAndNEAR {
    pub id: String,
    pub near: String,
}

impl From<serde_json::Value> for RecordWithIDAndNEAR {
    fn from(value: serde_json::Value) -> Self {
        let id = value.get("id").unwrap().as_str().unwrap().to_string();
        let fields = value.get("fields").unwrap();
        let near = match fields.get("NEAR") {
            Some(near) => near.as_str().unwrap().to_string(),
            None => "".to_string(),
        };
        Self { id, near }
    }
}

pub async fn get_stored<T>(
    client: &reqwest::Client,
    url: &str,
) -> anyhow::Result<(Option<String>, Vec<T>)>
where
    T: From<serde_json::Value> + std::fmt::Debug,
{
    let result = client
        .get(url)
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;
    Ok((
        match result.get("offset") {
            Some(offset) => Some(offset.as_str().unwrap_or_default().to_string()),
            None => None,
        },
        result
            .get("records")
            .ok_or(anyhow::anyhow!("No records found"))?
            .as_array()
            .ok_or(anyhow::anyhow!("Empty records"))?
            .iter()
            .map(|record| T::from(record.clone()))
            .collect::<Vec<_>>(),
    ))
}

pub async fn get_all_at<T>(client: &reqwest::Client, url: &str) -> anyhow::Result<Vec<T>>
where
    T: From<serde_json::Value> + std::fmt::Debug,
{
    let mut offset = "".to_string();
    let mut result = vec![];
    loop {
        let (offset_opt, mut records) =
            get_stored::<T>(&client, &format!("{url}&offset={offset}")).await?;
        result.append(&mut records);
        if let Some(of) = offset_opt {
            offset = of;
        } else {
            break;
        }
    }
    Ok(result)
}

pub enum EntityType {
    Project,
    Contributor,
}

impl std::fmt::Display for EntityType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            EntityType::Project => write!(f, "projects"),
            EntityType::Contributor => write!(f, "contributors"),
        }
    }
}

pub async fn check_if_exist(
    client: &reqwest::Client,
    url: &str,
    entity_type: EntityType,
    id: &str,
) -> anyhow::Result<(bool, String)> {
    let status_code = client
        .get(&format!("{url}/{entity_type}/{id}"))
        .send()
        .await?
        .status();
    Ok((status_code.is_success(), id.to_string()))
}

pub async fn delete(client: &reqwest::Client, url: &str, ids: &[String]) -> anyhow::Result<()> {
    let mut url = format!("{url}?");
    for id in ids {
        url.push_str(&format!("records%5B%5D={id}&"));
    }
    client.delete(url).send().await?;
    Ok(())
}

pub async fn delete_many(
    client: &reqwest::Client,
    url: &str,
    for_deletion: Vec<String>,
) -> anyhow::Result<()> {
    println!("Deleting {for_deletion:#?} stale records");

    futures::stream::iter(
        for_deletion
            .chunks(10)
            .map(|ids| delete(&client, &url, ids)),
    )
    .buffer_unordered(10)
    .collect::<Vec<_>>()
    .await
    .into_iter()
    .try_collect()?;

    Ok(())
}
