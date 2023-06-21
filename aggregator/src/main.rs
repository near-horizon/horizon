use horizon::{contribution::Contribution, proposal::Proposal};
use itertools::Itertools;
use near_jsonrpc_client::{JsonRpcClient, NEAR_MAINNET_RPC_URL};

use aggregator::{
    claims, contribution,
    investor::{self, Investor},
    project::{self, Project},
    request::{self, FullRequest},
    vendor::{self, Vendor},
    Completion, FetchAll,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");
    let horizon_account = std::env::var("CONTRACT_ID")
        .expect("CONTRACT_ID is not set")
        .parse()?;
    let social_account = std::env::var("SOCIAL_CONTRACT")
        .unwrap_or("social.near".to_string())
        .parse()?;

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

    eprintln!("Projects:");
    let projects = Project::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Project::count_with_min_completion(3, projects.values().cloned());
    let filled = Project::avarage_completion(projects.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, projects.len());
    eprintln!("Average completion: {:#?}", filled);
    eprintln!("Inserting...");
    project::insert_many(&pool, projects.values().cloned().collect_vec()).await?;

    eprintln!("Vendors:");
    let vendors = Vendor::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Vendor::count_with_min_completion(3, vendors.values().cloned());
    let filled = Vendor::avarage_completion(vendors.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, vendors.len());
    eprintln!("Average completion: {:#?}", filled);
    eprintln!("Inserting...");
    vendor::insert_many(&pool, vendors.values().cloned().collect_vec()).await?;

    eprintln!("Investors:");
    let investors = Investor::fetch_all(&client, &horizon_account, &social_account).await?;
    let filled_out = Investor::count_with_min_completion(3, investors.values().cloned());
    let filled = Investor::avarage_completion(investors.values().cloned());
    eprintln!("{:#?}/{:#?}", filled_out, investors.len());
    eprintln!("Average completion: {:#?}", filled);
    eprintln!("Inserting...");
    investor::insert_many(&pool, investors.values().cloned().collect_vec()).await?;

    let requests = request::get_all_requests(&client, &horizon_account).await?;
    eprintln!("Requests: {:#?}", requests.len());
    eprintln!("Inserting...");
    request::insert_many(&pool, requests.values().cloned().collect_vec()).await?;

    let contributions = contribution::get_all_contributions(&client, &horizon_account).await?;
    eprintln!("Contributions: {:#?}", contributions.len());
    eprintln!("Inserting...");
    contribution::insert_many(&pool, contributions.clone()).await?;

    let claims = claims::get_all_claims(&client, &horizon_account).await?;
    eprintln!("Claims: {:#?}", claims.len());
    eprintln!("Inserting...");
    claims::insert_many(&pool, claims.clone().into_iter().collect_vec()).await?;
    eprintln!("Syncing deleted claims...");
    claims::sync_deleted(
        &pool,
        &claims
            .keys()
            .map(|(project_id, account_id)| (project_id.to_string(), account_id.to_string()))
            .collect(),
    )
    .await?;

    eprintln!("Syncing deleted contributions...");
    contribution::sync_deleted(
        &pool,
        &contributions
            .iter()
            .map(
                |Contribution {
                     proposal_id: ((project_id, cid), vendor_id),
                     ..
                 }| {
                    (
                        (project_id.to_string(), cid.to_string()),
                        vendor_id.to_string(),
                    )
                },
            )
            .collect(),
    )
    .await?;

    eprintln!("Syncing deleted requests...");
    request::sync_deleted(
        &pool,
        &requests
            .keys()
            .map(|(project_id, cid)| (project_id.to_string(), cid.to_string()))
            .collect(),
        &requests
            .iter()
            .flat_map(|(_, FullRequest { proposals, .. })| {
                proposals.iter().map(
                    |Proposal {
                         request_id: (project_id, cid),
                         vendor_id,
                         ..
                     }| {
                        ((project_id.to_string(), cid.clone()), vendor_id.to_string())
                    },
                )
            })
            .collect(),
    )
    .await?;

    eprintln!("Syncing deleted investors...");
    investor::sync_deleted(
        &pool,
        &investors
            .keys()
            .map(|investor_id| investor_id.to_string())
            .collect(),
    )
    .await?;

    eprintln!("Syncing deleted vendors...");
    vendor::sync_deleted(
        &pool,
        &vendors
            .keys()
            .map(|vendor_id| vendor_id.to_string())
            .collect(),
    )
    .await?;

    eprintln!("Syncing deleted projects...");
    project::sync_deleted(
        &pool,
        &projects
            .keys()
            .map(|project_id| project_id.to_string())
            .collect(),
    )
    .await?;

    eprintln!("Done");

    Ok(())
}
