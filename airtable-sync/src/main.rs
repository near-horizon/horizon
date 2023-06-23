use serde::{Deserialize, Serialize};

fn ensure_env(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| panic!("{name} must be set"))
}

fn default_headers() -> reqwest::header::HeaderMap {
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

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let base_id = ensure_env("AIRTABLE_BASE_ID");
    let table_name = ensure_env("AIRTABLE_TABLE_NAME");
    let vendor_table_name = ensure_env("AIRTABLE_VENDOR_TABLE_NAME");
    let database_url = ensure_env("DATABASE_URL");

    let headers = default_headers();

    let client = reqwest::ClientBuilder::new()
        .default_headers(headers)
        .build()?;
    let pool = sqlx::postgres::PgPool::connect(&database_url).await?;

    let url = format!("https://api.airtable.com/v0/{base_id}/{table_name}");

    let projects = sqlx::query!(
        r#"
        SELECT *
        FROM projects
        "#,
    )
    .fetch_all(&pool)
    .await?;

    let records = projects
        .into_iter()
        .map(|project| ProjectFields {
            name: project.name,
            founders: project.founders.join(","),
            email: "".to_string(),
            id: project.id,
            verticals: project
                .vertical
                .as_object()
                .unwrap()
                .keys()
                .cloned()
                .collect::<Vec<String>>(),
            stage: project.stage,
            location: project.geo,
            source: vec!["Horizon".to_string()],
        })
        .collect::<Vec<_>>();

    upsert(&client, &url, &records).await?;

    let url = format!("https://api.airtable.com/v0/{base_id}/{vendor_table_name}");

    let vendors = sqlx::query!(
        r#"
        SELECT *
        FROM vendors
        "#,
    )
    .fetch_all(&pool)
    .await?;

    let records = vendors
        .into_iter()
        .map(|vendor| VendorFields {
            id: vendor.id,
            name: vendor.name,
            email: "".to_string(),
            founders: vendor
                .permissions
                .as_object()
                .unwrap()
                .keys()
                .cloned()
                .collect::<Vec<_>>()
                .join(","),
            vendor_type: vendor.vendor_type,
            payments: vendor
                .payments
                .into_iter()
                .map(|p| {
                    p.strip_prefix('\"')
                        .unwrap()
                        .strip_suffix('\"')
                        .unwrap()
                        .to_string()
                })
                .collect::<Vec<_>>(),
            source: vec!["Horizon".to_string()],
        })
        .collect::<Vec<_>>();

    upsert(&client, &url, &records).await?;

    Ok(())
}
