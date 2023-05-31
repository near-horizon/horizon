use itertools::Itertools;
use near_jsonrpc_client::{JsonRpcClient, NEAR_MAINNET_RPC_URL};

use aggregator::{
    contribution,
    investor::{self, Investor},
    project::{self, Project},
    request,
    vendor::{self, Vendor},
    Completion, FetchAll,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");

    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to connect to Postgres");

    sqlx::migrate!("../migrations")
        .run(&pool)
        .await
        .expect("Migration failed");

    let client = JsonRpcClient::connect(NEAR_MAINNET_RPC_URL);
    let horizon_account = "nearhorizon.near".parse().unwrap();
    let social_account = "social.near".parse().unwrap();

    eprintln!("Projects:");
    let projects = Project::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Project::count_with_min_completion(3, projects.values().cloned());
    let filled = Project::avarage_completion(projects.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, projects.len());
    eprintln!("Avarage completion: {:#?}", filled);
    eprintln!("Inserting...");
    project::insert_many(&pool, projects.values().cloned().collect_vec()).await?;

    eprintln!("Vendors:");
    let vendors = Vendor::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Vendor::count_with_min_completion(3, vendors.values().cloned());
    let filled = Vendor::avarage_completion(vendors.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, vendors.len());
    eprintln!("Avarage completion: {:#?}", filled);
    eprintln!("Inserting...");
    vendor::insert_many(&pool, vendors.values().cloned().collect_vec()).await?;

    eprintln!("Investors:");
    let investors = Investor::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Investor::count_with_min_completion(3, investors.values().cloned());
    let filled = Investor::avarage_completion(investors.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, investors.len());
    eprintln!("Avarage completion: {:#?}", filled);
    eprintln!("Inserting...");
    investor::insert_many(&pool, investors.values().cloned().collect_vec()).await?;

    let requests = request::get_all_requests(&client, &horizon_account).await?;
    eprintln!("Requests: {:#?}", requests.len());
    eprintln!("Inserting...");
    request::insert_many(&pool, requests.values().cloned().collect_vec()).await?;

    let contributions = contribution::get_all_contributions(&client, &horizon_account).await?;
    eprintln!("Contributions: {:#?}", contributions.len());
    eprintln!("Inserting...");
    contribution::insert_many(&pool, contributions).await?;

    Ok(())
}
