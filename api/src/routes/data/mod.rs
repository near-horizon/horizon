use axum::Router;

use crate::AppState;

pub mod claims;
pub mod investors;
pub mod projects;
pub mod requests;
pub mod vendors;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/claims", claims::create_router())
        .nest("/investors", investors::create_router())
        .nest("/projects", projects::create_router())
        .nest("/requests", requests::create_router())
        .nest("/vendors", vendors::create_router())
}
