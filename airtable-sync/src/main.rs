use serde::Serialize;

fn ensure_env(name: &str) -> String {
    std::env::var(name)
        .expect(&format!("{} must be set", name))
        .to_string()
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

#[derive(Serialize, Debug)]
pub struct Fields {
    #[serde(rename = "Project name", skip_serializing_if = "String::is_empty")]
    pub name: String,
    #[serde(rename = "Horizon Founder Accounts")]
    pub founders: String,
    #[serde(rename = "Horizon Founder Email")]
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

#[derive(Serialize, Debug)]
pub struct UpsertStruct {
    #[serde(skip_serializing_if = "String::is_empty")]
    pub id: String,
    pub fields: Fields,
}

impl UpsertStruct {
    pub fn new(fields: Fields) -> Self {
        Self {
            id: String::new(),
            fields,
        }
    }
}

pub async fn upsert(
    client: &reqwest::Client,
    url: &str,
    records: &[UpsertStruct],
) -> anyhow::Result<()> {
    for records_batch in records.chunks(10) {
        let response = client
            .patch(url)
            .json(&serde_json::json!({
                "records": records_batch,
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
        .map(|project| {
            let fields = Fields {
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
            };
            UpsertStruct::new(fields)
        })
        .collect::<Vec<_>>();

    upsert(&client, &url, &records).await?;

    Ok(())
}
