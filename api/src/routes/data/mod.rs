use axum::Router;

use crate::AppState;

pub mod investors;
pub mod projects;
pub mod requests;
pub mod vendors;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/investors", investors::create_router())
        .nest("/projects", projects::create_router())
        .nest("/requests", requests::create_router())
        .nest("/vendors", vendors::create_router())
}
