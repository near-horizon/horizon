use reqwest::header;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

const AWESOME_NEAR_API: &str = "https://awesomenear.com/api/graphql";

#[derive(Deserialize, Debug)]
struct SimpleProject {
    id: String,
    #[allow(dead_code)]
    slug: String,
    #[allow(dead_code)]
    title: String,
}

#[derive(Deserialize, Debug)]
struct ProjectsList {
    #[serde(rename = "projectsList")]
    projects_list: Vec<SimpleProject>,
}

#[derive(Deserialize, Debug)]
struct ProjectsListResponse {
    data: ProjectsList,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Token {
    name: Option<String>,
    id: Option<String>,
    #[serde(rename = "coinGeckoId")]
    coin_gecko_id: Option<String>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Author {
    email: Option<String>,
    id: Option<String>,
    image: Option<String>,
    name: Option<String>,
    role: Option<String>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct Contract {
    id: Option<String>,
    name: Option<String>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct ProjectDetails {
    #[serde(rename = "createdAt")]
    created_at: Option<String>,
    discord: Option<String>,
    facebood: Option<String>,
    github: Option<String>,
    investors: Option<String>,
    #[serde(rename = "linkedIn")]
    linked_in: Option<String>,
    logo: Option<String>,
    medium: Option<String>,
    oneliner: Option<String>,
    #[serde(serialize_with = "optional_vec::serialize")]
    series: Option<Vec<String>>,
    slug: Option<String>,
    status: Option<String>,
    telegram: Option<String>,
    title: Option<String>,
    twitter: Option<String>,
    #[serde(rename = "updatedAt")]
    updated_at: Option<String>,
    website: Option<String>,
    whitepaper: Option<String>,
    #[serde(serialize_with = "optional_vec::serialize")]
    categories: Option<Vec<String>>,
    #[serde(serialize_with = "optional_author::serialize")]
    author: Option<Author>,
    #[serde(serialize_with = "optional_token::serialize")]
    token: Option<Token>,
    #[allow(dead_code)]
    #[serde(skip)]
    tokens: Vec<Token>,
    #[allow(dead_code)]
    #[serde(skip)]
    contracts: Vec<Contract>,
    #[allow(dead_code)]
    #[serde(skip)]
    description: Option<String>,
}

mod optional_token {
    pub fn serialize<S>(token: &Option<super::Token>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match token {
            Some(token) => serializer.serialize_str(&format!(
                "({},{},{})",
                token.id.clone().unwrap_or(String::new()),
                token.name.clone().unwrap_or(String::new()),
                token.coin_gecko_id.clone().unwrap_or(String::new()),
            )),
            None => serializer.serialize_none(),
        }
    }
}

mod optional_author {
    pub fn serialize<S>(author: &Option<super::Author>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match author {
            Some(author) => serializer.serialize_str(&format!(
                "({},{},{},{},{})",
                author.id.clone().unwrap_or(String::new()),
                author.name.clone().unwrap_or(String::new()),
                author.email.clone().unwrap_or(String::new()),
                author.role.clone().unwrap_or(String::new()),
                author.image.clone().unwrap_or(String::new())
            )),
            None => serializer.serialize_none(),
        }
    }
}

mod optional_vec {
    pub fn serialize<S>(vec: &Option<Vec<String>>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match vec {
            Some(vector) => serializer.serialize_str(&vector.join(",")),
            None => serializer.serialize_none(),
        }
    }
}

#[derive(Deserialize, Debug, Clone)]
struct ProjectDetailsResponse {
    project: Option<ProjectDetails>,
}

#[derive(Deserialize, Debug, Clone)]
struct TopLevelProjectDetailsResponse {
    data: Option<ProjectDetailsResponse>,
}

fn create_query_for_project(id: &str) -> Value {
    let query = format!("query ProjectDetails {{\n  project(id: \"{id}\") {{\n    createdAt\n    description\n    discord\n    facebook\n    github\n    investors\n    linkedIn\n    logo\n    medium\n    oneliner\n    series\n    slug\n    status\n    telegram\n    title\n    tokens {{\n      name\n      id\n      coinGeckoId\n    }}\n    twitter\n    updatedAt\n    website\n    whitepaper\n    categories\n    contracts {{\n      id\n      name\n    }}\n    author {{\n      email\n      id\n      image\n      name\n      role\n    }}\n    token {{\n      name\n      coinGeckoId\n    }}\n  }}\n}}");
    json!({
        "query": query,
        "operationName": "ProjectDetails",
        "extensions": {}
    })
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "Content-Type",
        header::HeaderValue::from_static("application/json"),
    );

    let client = reqwest::ClientBuilder::new()
        .default_headers(headers)
        .build()?;

    let project_list_query = json!({
      "query": "query ProjectListQuery {\n  projectsList {\n    id\n    slug\n    title\n  }\n}",
      "operationName": "ProjectListQuery",
      "extensions": {}
    });

    let ProjectsListResponse { data } = client
        .post(AWESOME_NEAR_API)
        .json(&project_list_query)
        .send()
        .await?
        .json::<ProjectsListResponse>()
        .await?;

    let mut fetch_set = tokio::task::JoinSet::new();

    for (index, project) in data.projects_list.iter().enumerate() {
        if index > 0 && index % 100 == 0 {
            let sleep_secs = 10;
            println!("Waiting for {sleep_secs} second after {index} records...");
            tokio::time::sleep(tokio::time::Duration::from_secs(sleep_secs)).await;
        }
        fetch_set.spawn(
            client
                .post(AWESOME_NEAR_API)
                .json(&create_query_for_project(&project.id))
                .send(),
        );
    }

    println!("Fetching {} records from awesomenear...", fetch_set.len());

    let mut json_set = tokio::task::JoinSet::new();

    while let Some(response) = fetch_set.join_one().await {
        json_set.spawn((response?)?.json::<TopLevelProjectDetailsResponse>());
    }

    let mut writer = csv::WriterBuilder::new()
        .has_headers(true)
        .from_path("../data.csv")?;

    let mut written_count = 0;

    println!("Parsing {} records...", json_set.len());

    while let Some(details) = json_set.join_one().await {
        let details = details?;

        let Ok(details) = details else {
            continue;
        };

        if let Some(project) = details.data {
            written_count += 1;
            writer.serialize(project.project)?;
        }
    }

    println!("Writing {written_count} records...");

    writer.flush()?;

    println!("Written {written_count} records!");

    Ok(())
}
