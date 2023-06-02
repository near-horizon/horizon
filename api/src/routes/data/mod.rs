use axum::Router;

use crate::AppState;

pub mod projects;
pub mod vendors;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/projects", projects::create_router())
        .nest("/vendors", vendors::create_router())
}
