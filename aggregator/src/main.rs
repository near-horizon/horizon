use near_jsonrpc_client::{JsonRpcClient, NEAR_MAINNET_RPC_URL};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");
    //
    // let pool = sqlx::postgres::PgPoolOptions::new()
    //     .max_connections(5)
    //     .connect(&db_url)
    //     .await
    //     .expect("Failed to connect to Postgres");
    //
    // sqlx::migrate!("../migrations")
    //     .run(&pool)
    //     .await
    //     .expect("Migration failed");

    let client = JsonRpcClient::connect(NEAR_MAINNET_RPC_URL);
    let horizon_account = "nearhorizon.near".parse().unwrap();
    let social_account = "social.near".parse().unwrap();

    let project_ids = aggregator::project::get_project_ids(&client, &horizon_account).await?;

    let projects = aggregator::project::get_projects_data(
        &client,
        horizon_account,
        social_account,
        &project_ids,
    )
    .await?;

    let filled_out = projects
        .iter()
        .filter(|(_, value)| value.completion().0 > 3)
        .count();
    let filled = projects
        .values()
        .map(|value| {
            let (completed, total) = value.completion();
            completed as f64 / total as f64
        })
        .sum::<f64>()
        / projects.len() as f64;
    println!("{:#?}/{:#?}", filled_out, projects.len());
    println!("Avarage completion: {:#?}", filled);

    let mut writer = csv::WriterBuilder::new().from_path("contact.csv")?;

    writer.write_record([
        "project_id",
        "project_name",
        "website",
        "twitter",
        "discord",
        "reddit",
    ])?;

    for (project_id, project) in projects {
        let website = if !project.profile.website.is_empty() {
            project.profile.website
        } else if let Some(link) = project.profile.linktree.get("website") {
            link.to_owned()
        } else {
            String::new()
        };
        let twitter = if let Some(twitter) = project.profile.linktree.get("twitter") {
            twitter.to_owned()
        } else {
            String::new()
        };
        let discord = if let Some(discord) = project.profile.linktree.get("discord") {
            discord.to_owned()
        } else {
            String::new()
        };
        let reddit = if let Some(reddit) = project.profile.linktree.get("reddit") {
            reddit.to_owned()
        } else {
            String::new()
        };
        let name = project.profile.name;
        writer.write_record([
            project_id.to_string(),
            name,
            website,
            twitter,
            discord,
            reddit,
        ])?;
    }

    writer.flush()?;

    Ok(())
}
