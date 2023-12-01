use airtable_sync::{
    contributors::{get_contributors_for_deletion, get_contributors_from_app},
    default_headers, delete_many, ensure_env,
    projects::{get_projects_for_deletion, get_projects_from_app},
    upsert,
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    let base_id = ensure_env("AIRTABLE_BASE_ID");
    let table_name = ensure_env("AIRTABLE_TABLE_NAME");
    let vendor_table_name = ensure_env("AIRTABLE_VENDOR_TABLE_NAME");
    let database_url = ensure_env("DATABASE_URL");

    let headers = default_headers();

    let client = reqwest::ClientBuilder::new()
        .default_headers(headers)
        .build()?;
    let pool = sqlx::postgres::PgPool::connect(&database_url).await?;

    let base_url = format!("https://api.airtable.com/v0/{base_id}");

    // Projects table url
    let url = format!("{base_url}/{table_name}");

    // Get projects from the marketplace
    let records = get_projects_from_app(&pool).await?;

    // Upsert projects in airtable
    upsert(&client, &url, &records).await?;

    // Get all projects from airtable
    let for_deletion = get_projects_for_deletion(&client, &url).await?;

    // Delete stale projects from airtable
    delete_many(&client, &url, for_deletion).await?;

    // Contributors table url
    let url = format!("{base_url}/{vendor_table_name}");

    // Get contributors from the marketplace
    let records = get_contributors_from_app(&pool).await?;

    // Upsert contributors in airtable
    upsert(&client, &url, &records).await?;

    // Get all contributors from airtable
    let for_deletion = get_contributors_for_deletion(&client, &url).await?;

    // Delete stale contributors from airtable
    delete_many(&client, &url, for_deletion).await?;

    Ok(())
}
