use reqwest::header;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

const AWESOME_NEAR_API: &'static str = "https://awesomenear.com/api/graphql";

#[derive(Deserialize, Debug)]
struct SimpleProject {
    id: String,
    slug: String,
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
struct Token {
    name: Option<String>,
    id: Option<String>,
    #[serde(rename = "coinGeckoId")]
    coin_gecko_id: Option<String>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct Author {
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
    #[serde(skip)]
    tokens: Vec<Token>,
    #[serde(skip)]
    token: Option<Token>,
    #[serde(skip)]
    contracts: Vec<Contract>,
    #[serde(skip)]
    description: Option<String>,
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
    project: ProjectDetails,
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

    for project in data.projects_list {
        fetch_set.spawn(
            client
                .post(AWESOME_NEAR_API)
                .json(&create_query_for_project(&project.id))
                .send(),
        );
    }

    let mut json_set = tokio::task::JoinSet::new();
    // let mut projects = vec![];

    while let Some(response) = fetch_set.join_one().await {
        let response = response?;
        let response = response?;
        json_set.spawn(response.json::<TopLevelProjectDetailsResponse>());
        // projects.push(response.json::<TopLevelProjectDetailsResponse>().await?);
    }

    let mut writer = csv::WriterBuilder::new().from_path("../data.csv")?;

    while let Some(details) = json_set.join_one().await {
        let details = details?;

        let Ok(details) = details else {
            println!("error here");
            continue;
        };

        if let Some(project) = details.data {
            writer.serialize(project.project)?;
        }
    }
    // for project in projects {
    //     writer.serialize(project.data.project)?;
    // }

    writer.flush()?;

    Ok(())
}
