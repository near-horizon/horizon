use std::str::FromStr;

use api::{ensure_var, AppState};
use near_account_id::AccountId;
use reqwest::Client;

#[allow(dead_code)]
fn generate_key() -> String {
    hex::encode(sodiumoxide::crypto::secretbox::gen_key().0)
}

#[tokio::main]
async fn main() {
    let contract_id = AccountId::from_str(&ensure_var("CONTRACT_ID")).expect("Invalid contract id");

    let key = hex::decode(ensure_var("ENCRYPTION_KEY")).expect("Invalid key");
    let key = sodiumoxide::crypto::secretbox::Key::from_slice(&key).expect("Invalid key");
    let port = std::env::var("PORT").unwrap_or("3000".to_string());

    let atlas_route = ensure_var("TOTAL_FUNDRAISE_ROUTE");
    let atlas_auth = ensure_var("TOTAL_FUNDRAISE_AUTH");

    let db_url = ensure_var("DATABASE_URL");

    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to connect to database");

    let state = AppState {
        client: Client::new(),
        contract_id,
        key,
        atlas_route,
        atlas_auth,
        pool,
    };

    let app = api::routes::create_router().with_state(state);

    let address = format!("0.0.0.0:{port}");

    axum::Server::bind(&address.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
