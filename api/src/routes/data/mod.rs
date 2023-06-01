use axum::Router;

use crate::AppState;

pub mod projects;

pub fn create_router() -> Router<AppState> {
    Router::new().nest("/projects", projects::create_router())
}
