use axum::Router;

use crate::AppState;

pub mod atlas;
pub mod decrypt;
pub mod encrypt;
pub mod transactions;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/encrypt", encrypt::create_router())
        .nest("/decrypt", decrypt::create_router())
        .nest("/transactions", transactions::create_router())
        .nest("/atlas", atlas::create_router())
}
