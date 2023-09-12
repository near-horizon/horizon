use api::AppState;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

#[allow(dead_code)]
fn generate_key() -> String {
    hex::encode(sodiumoxide::crypto::secretbox::gen_key().0)
}

#[tokio::main]
async fn main() {
    let state = AppState::new().await;

    tracing_subscriber::fmt::init();

    let trace = TraceLayer::new_for_http();
    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_origin(Any)
        .allow_headers(Any);
    let middleware = ServiceBuilder::new().layer(trace).layer(cors);

    let app = api::routes::create_router()
        .with_state(state)
        .layer(middleware);

    let port = std::env::var("PORT").unwrap_or("3000".to_string());
    let address = format!("0.0.0.0:{port}");

    axum::Server::bind(&address.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
