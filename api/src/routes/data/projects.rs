use std::collections::HashSet;

use axum::{
    debug_handler,
    extract::{Path, Query, State},
    http::HeaderMap,
    routing::{get, put},
    Json, Router,
};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::Row;

use crate::{
    auth::authorize_bearer,
    routes::data::{set_deserialize, Completion, CompletionPair},
    ApiResult, AppState,
};

pub fn size_deserialize<'de, D>(deserializer: D) -> Result<Option<HashSet<(u32, u32)>>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        return Ok(None);
    }
    Ok(Some(
        s.split(',')
            .filter_map(|range| {
                let parts: Vec<_> = range.split('-').collect();
                if parts.is_empty() && parts.len() != 2 {
                    return None;
                }
                let Some(from) = parts.first() else {
                    return None;
                };
                let Some(to) = parts.last() else {
                    return None;
                };
                let Ok(from) = from.parse::<u32>() else {
                    return None;
                };
                let Ok(to) = to.parse::<u32>() else {
                    return None;
                };
                if from > to {
                    return None;
                }
                Some((from, to))
            })
            .collect(),
    ))
}

#[derive(Deserialize, Serialize, Debug, Clone, Copy, Default)]
#[serde(rename_all = "lowercase")]
pub enum Sort {
    TimeAsc,
    #[default]
    TimeDesc,
    NameAsc,
    NameDesc,
    RecentAsc,
    RecentDesc,
}

impl Sort {
    pub fn get_order_by(&self) -> (&'static str, &'static str) {
        match self {
            Sort::TimeAsc => (
                r#"
                LEFT JOIN (
                  SELECT
                    DISTINCT ON (transactions.args ->> 'account_id') transactions.args ->> 'account_id' as account_id,
                    transactions.timestamp
                  FROM
                    transactions
                  WHERE
                    transactions.method_name = 'add_project'
                  ORDER BY
                    transactions.args ->> 'account_id' ASC,
                    transactions.timestamp ASC
                ) as txs ON projects.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::TimeDesc => (
                r#"
                LEFT JOIN (
                  SELECT
                    DISTINCT ON (transactions.args ->> 'account_id') transactions.args ->> 'account_id' as account_id,
                    transactions.timestamp
                  FROM
                    transactions
                  WHERE
                    transactions.method_name = 'add_project'
                  ORDER BY
                    transactions.args ->> 'account_id' ASC,
                    transactions.timestamp DESC
                ) as txs ON projects.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
            Sort::NameAsc => ("", "ORDER BY NULLIF(projects.name, '') ASC NULLS LAST"),
            Sort::NameDesc => ("", "ORDER BY NULLIF(projects.name, '') DESC NULLS LAST"),
            Sort::RecentAsc => (
                r#"
                LEFT JOIN (
                  SELECT
                    DISTINCT ON (
                      COALESCE(
                        transactions.args ->> 'account_id',
                        transactions.args ->> 'project_id'
                      )
                    ) COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) as account_id,
                    transactions.method_name,
                    transactions.timestamp
                  FROM
                    transactions
                  WHERE
                    COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) IS NOT NULL
                    AND transactions.method_name IN ('add_project', 'edit_project')
                  ORDER BY
                    COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) ASC,
                    transactions.timestamp ASC
                ) as txs ON projects.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp ASC",
            ),
            Sort::RecentDesc => (
                r#"
                LEFT JOIN (
                  SELECT
                    DISTINCT ON (
                      COALESCE(
                        transactions.args ->> 'account_id',
                        transactions.args ->> 'project_id'
                      )
                    ) COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) as account_id,
                    transactions.method_name,
                    transactions.timestamp
                  FROM
                    transactions
                  WHERE
                    COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) IS NOT NULL
                    AND transactions.method_name IN ('add_project', 'edit_project')
                  ORDER BY
                    COALESCE(
                      transactions.args ->> 'account_id',
                      transactions.args ->> 'project_id'
                    ) ASC,
                    transactions.timestamp DESC
                ) as txs ON projects.id = txs.account_id
                "#,
                "ORDER BY txs.timestamp DESC",
            ),
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct Params {
    #[serde(default)]
    pub sort: Sort,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub vertical: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub integration: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub dev: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub stage: Option<HashSet<String>>,
    #[serde(default, deserialize_with = "size_deserialize")]
    pub size: Option<HashSet<(u32, u32)>>,
    #[serde(default, deserialize_with = "set_deserialize")]
    pub distribution: Option<HashSet<String>>,
    #[serde(default)]
    pub fundraising: Option<bool>,
    pub from: Option<u32>,
    pub limit: Option<u32>,
    #[serde(rename = "q")]
    pub search: Option<String>,
}

#[debug_handler(state = AppState)]
pub async fn all_projects(
    Query(params): Query<Params>,
    headers: HeaderMap,
    State(state): State<AppState>,
) -> ApiResult<Json<Vec<String>>> {
    let mut builder = sqlx::QueryBuilder::new(
        r#"
        SELECT
          projects.id
        FROM
          projects
        "#,
    );

    let (join, order_by) = params.sort.get_order_by();

    builder.push(join);

    let mut has_where = false;

    if let Some(verticals) = params.vertical {
        let verticals = verticals.into_iter().collect::<Vec<_>>();
        builder.push("WHERE projects.vertical ?| ");
        builder.push_bind(verticals);
        has_where = true;
    }

    if let Some(integration) = params.integration {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.integration = ANY (");
        builder.push_bind(integration.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(stage) = params.stage {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.stage = ANY (");
        builder.push_bind(stage.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(dev) = params.dev {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.dev = ANY (");
        builder.push_bind(dev.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(sizes) = params.size {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push(" ( ");
        let statement = r#"
        (
          SELECT
            COUNT(*)
          FROM
            jsonb_object_keys(projects.team)
        ) + array_length(projects.founders, 1) BETWEEN
        "#;

        for (i, (from, to)) in sizes.into_iter().enumerate() {
            if i > 0 {
                builder.push(" OR ");
            }
            builder.push(statement);
            builder.push_bind(from as i32);
            builder.push(" AND ");
            builder.push_bind(to as i32);
        }
        builder.push(" ) ");
    }

    if let Some(distribution) = params.distribution {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.distribution = ANY (");
        builder.push_bind(distribution.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(fundraising) = params.fundraising {
        authorize_bearer(&headers, &state).await?;
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push(" projects.backers_digest ->> 'published' = ");
        builder.push_bind(fundraising.to_string());
    }

    if let Some(search) = params.search {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push(" WHERE ");
        }
        let search = format!("%{search}%");
        builder.push(" (projects.name ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.tagline ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.description ILIKE ");
        builder.push_bind(search);
        builder.push(") ");
    }

    builder.push(format!(" {order_by}"));

    if let Some(limit) = params.limit {
        builder.push(" LIMIT ");
        builder.push_bind(limit as i32);
    }

    if let Some(from) = params.from {
        builder.push(" OFFSET ");
        builder.push_bind(from as i32);
    }

    let result = builder.build().fetch_all(&state.pool).await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get projects: {e}"),
        )
    })?;

    Ok(Json({
        let mut seen = HashSet::<String>::new();
        result
            .into_iter()
            .filter_map(|r| {
                let id: String = r.get("id");
                (!seen.contains(&id)).then_some({
                    seen.insert(id.clone());
                    id
                })
            })
            .collect()
    }))
}

#[debug_handler(state = AppState)]
pub async fn projects_count(
    Query(params): Query<Params>,
    headers: HeaderMap,
    State(state): State<AppState>,
) -> ApiResult<Json<i64>> {
    let mut builder = sqlx::QueryBuilder::new(
        r#"
        SELECT
          COUNT(*)
        FROM
          projects
        "#,
    );

    let mut has_where = false;

    if let Some(verticals) = params.vertical {
        let verticals = verticals.into_iter().collect::<Vec<_>>();
        builder.push("WHERE projects.vertical ?| ");
        builder.push_bind(verticals);
        has_where = true;
    }

    if let Some(integration) = params.integration {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.integration = ANY (");
        builder.push_bind(integration.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(stage) = params.stage {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.stage = ANY (");
        builder.push_bind(stage.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(dev) = params.dev {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.dev = ANY (");
        builder.push_bind(dev.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(sizes) = params.size {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push(" ( ");
        let statement = r#"
        (
          SELECT
            COUNT(*)
          FROM
            jsonb_object_keys(projects.team)
        ) + array_length(projects.founders, 1) BETWEEN
        "#;

        for (i, (from, to)) in sizes.into_iter().enumerate() {
            if i > 0 {
                builder.push(" OR ");
            }
            builder.push(statement);
            builder.push_bind(from as i32);
            builder.push(" AND ");
            builder.push_bind(to as i32);
        }
        builder.push(" ) ");
    }

    if let Some(distribution) = params.distribution {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push("projects.distribution = ANY (");
        builder.push_bind(distribution.into_iter().collect::<Vec<_>>());
        builder.push(") ");
    }

    if let Some(fundraising) = params.fundraising {
        authorize_bearer(&headers, &state).await?;
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push("WHERE ");
            has_where = true;
        }
        builder.push(" projects.backers_digest ->> 'published' = ");
        builder.push_bind(fundraising.to_string());
    }

    if let Some(search) = params.search {
        if has_where {
            builder.push(" AND ");
        } else {
            builder.push(" WHERE ");
        }
        let search = format!("%{search}%");
        builder.push(" (projects.name ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.id ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.tagline ILIKE ");
        builder.push_bind(search.clone());
        builder.push(" OR projects.description ILIKE ");
        builder.push_bind(search);
        builder.push(") ");
    }

    let result = builder
        .build_query_scalar()
        .fetch_one(&state.pool)
        .await
        .map_err(|e| {
            println!("{}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to get projects: {e}"),
            )
        })?;

    Ok(Json(result))
}

#[debug_handler(state = AppState)]
pub async fn get_similar_projects(
    Path(account_id): Path<String>,
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<Vec<String>>> {
    let project = sqlx::query!(
        r#"
        SELECT
          projects.id
        FROM
          (
            SELECT
              *
            FROM
              projects
            WHERE
              id = $1
          ) AS target,
          (
            SELECT
              *
            FROM
              projects
            WHERE
              id != $1
          ) AS projects
        WHERE
          (
            SELECT
              COUNT(*)
            FROM
              jsonb_object_keys(projects.vertical) AS v
            WHERE
              target.vertical ? v
          ) > 0
          OR (
            SELECT
              COUNT(*)
            FROM
              unnest(projects.product_type) AS v
            WHERE
              v = ANY (target.product_type)
          ) > 0
          OR projects.stage ILIKE target.stage
          OR projects.dev ILIKE target.dev
          OR projects.distribution ILIKE target.distribution
        ORDER BY
          (
            SELECT
              COUNT(*)
            FROM
              unnest(projects.product_type) AS v
            WHERE
              v = ANY (target.product_type)
          ) + (
            SELECT
              COUNT(*)
            FROM
              jsonb_object_keys(projects.vertical) AS v
            WHERE
              target.vertical ? v
          ) + (
            projects.stage ILIKE target.stage
          ) :: int + (
            projects.dev ILIKE target.dev
          ) :: int + (
            projects.distribution ILIKE target.distribution
          ) :: int DESC
        "#,
        account_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get project: {e}"),
        )
    })?;

    Ok(Json(project.into_iter().map(|p| p.id).collect()))
}

#[debug_handler(state = AppState)]
async fn get_completion(
    State(AppState { pool, .. }): State<AppState>,
) -> ApiResult<Json<Completion>> {
    let list = sqlx::query_as!(
        CompletionPair,
        r#"
        SELECT
          projects.id,
          projects.completion
        FROM
          projects
        ORDER BY
          projects.completion DESC
        "#
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get project completions: {e}"),
        )
    })?;

    let avg = list.iter().map(|c| c.completion).sum::<f64>() / list.len() as f64;

    Ok(Json(Completion { avg, list }))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PatchProject {
    #[serde(default)]
    email: Option<String>,
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    description: Option<String>,
    #[serde(default)]
    image: Option<serde_json::Value>,
    #[serde(default)]
    website: Option<String>,
    #[serde(default)]
    tagline: Option<String>,
    #[serde(default)]
    linktree: Option<serde_json::Value>,
    #[serde(default)]
    vertical: Option<serde_json::Value>,
    #[serde(default)]
    stage: Option<String>,
    #[serde(default)]
    userbase: Option<i32>,
    #[serde(default)]
    distribution: Option<String>,
    #[serde(default)]
    dev: Option<String>,
    #[serde(default)]
    product_type: Option<Vec<String>>,
    #[serde(default)]
    company_size: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PatchProjectResonse {
    pub status: bool,
}

#[debug_handler(state = AppState)]
async fn put_project(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(params): Json<PatchProject>,
) -> ApiResult<Json<PatchProjectResonse>> {
    authorize_bearer(&headers, &state).await?;
    sqlx::query_scalar!(
        r#"
        INSERT INTO
          changes (
            account_id,
            email,
            name,
            description,
            image,
            website,
            tagline,
            linktree,
            vertical,
            stage,
            userbase,
            distribution,
            dev,
            product_type,
            company_size
          )
        VALUES
          (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, $14, $15
          ) ON CONFLICT (account_id) DO
        UPDATE
        SET
          email = EXCLUDED.email,
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          website = EXCLUDED.website,
          tagline = EXCLUDED.tagline,
          linktree = EXCLUDED.linktree,
          vertical = EXCLUDED.vertical,
          stage = EXCLUDED.stage,
          userbase = EXCLUDED.userbase,
          distribution = EXCLUDED.distribution,
          dev = EXCLUDED.dev,
          product_type = EXCLUDED.product_type,
          company_size = EXCLUDED.company_size 
        RETURNING TRUE;
       "#,
        account_id,
        params.email.unwrap_or_default(),
        params.name.unwrap_or_default(),
        params.description.unwrap_or_default(),
        params.image.unwrap_or_default(),
        params.website.unwrap_or_default(),
        params.tagline.unwrap_or_default(),
        params.linktree.unwrap_or_default(),
        params.vertical.unwrap_or_default(),
        params.stage.unwrap_or_default(),
        params.userbase.unwrap_or_default(),
        params.distribution.unwrap_or_default(),
        params.dev.unwrap_or_default(),
        &params.product_type.unwrap_or_default(),
        params.company_size.unwrap_or_default(),
    )
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to update project: {e}"),
        )
    })
    .map(|status| {
        Json(PatchProjectResonse {
            status: status.unwrap_or_default(),
        })
    })
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChangesResponse {
    pub name: String,
    pub description: String,
    pub image: serde_json::Value,
    pub website: String,
    pub tagline: String,
    pub linktree: serde_json::Value,
    pub vertical: serde_json::Value,
    pub stage: String,
    pub userbase: i32,
    pub distribution: String,
    pub dev: String,
    pub product_type: Vec<String>,
    pub company_size: i32,
}

#[debug_handler(state = AppState)]
async fn changes(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
) -> ApiResult<Json<Option<ChangesResponse>>> {
    sqlx::query_as!(
        ChangesResponse,
        r#"
        SELECT
          name,
          description,
          image,
          website,
          tagline,
          linktree,
          vertical,
          stage,
          userbase,
          distribution,
          dev,
          product_type,
          company_size
        FROM
          changes
        WHERE
          account_id = $1
        "#,
        account_id.split_whitespace().collect::<Vec<_>>().join("")
    )
    .fetch_optional(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get changes: {}", e),
        )
    })
    .map(Json)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BackersDigestData {
    #[serde(default)]
    pub published: bool,
    #[serde(default)]
    pub location: String,
    #[serde(default)]
    pub company_size: String,
    #[serde(default)]
    pub website: String,
    #[serde(default)]
    pub linkedin: String,
    #[serde(default)]
    pub twitter: String,
    #[serde(default)]
    pub email: String,
    #[serde(default)]
    pub calendly_link: String,
    #[serde(default)]
    pub linktree: Value,
    #[serde(default)]
    pub traction: Value,
    #[serde(default)]
    pub founders: Vec<Value>,
    #[serde(default)]
    pub pitch: String,
    #[serde(default)]
    pub demo: String,
    #[serde(default)]
    pub demo_video: String,
    #[serde(default)]
    pub announcement: String,
    #[serde(default)]
    pub fundraising: bool,
    #[serde(default)]
    pub token: String,
}

#[debug_handler(state = AppState)]
async fn backers_digest_edit(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(backers_digest): Json<BackersDigestData>,
) -> ApiResult<Json<()>> {
    authorize_bearer(&headers, &state).await?;
    sqlx::query!(
        r#"
        UPDATE
          projects
        SET
          backers_digest = $1
        WHERE
          id = $2
        "#,
        serde_json::to_value(backers_digest).unwrap(),
        account_id
    )
    .execute(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to update project: {e}"),
        )
    })?;
    Ok(Json(()))
}

#[debug_handler(state = AppState)]
async fn backers_digest(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
    headers: HeaderMap,
) -> ApiResult<Json<BackersDigestData>> {
    authorize_bearer(&headers, &state).await?;
    sqlx::query!(
        r#"
        SELECT
          backers_digest
        FROM
          projects
        WHERE
          id = $1
        "#,
        account_id
    )
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get project: {e}"),
        )
    })
    .map(|mut p| {
        p.backers_digest
            .as_object_mut()
            .unwrap()
            .iter_mut()
            .for_each(|(_, v)| {
                if v.is_null() {
                    *v = serde_json::Value::String("".to_string());
                }
                if v.is_number() {
                    *v = serde_json::Value::String(v.as_i64().unwrap().to_string());
                }
            });
        Json(serde_json::from_value(p.backers_digest).unwrap())
    })
}

#[debug_handler(state = AppState)]
async fn add_backers_digest_token(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
    headers: HeaderMap,
) -> ApiResult<Json<String>> {
    authorize_bearer(&headers, &state).await?;
    let existing_token = sqlx::query_scalar!(
        r#"
        SELECT
          backers_digest ->> 'token'
        FROM
          projects
        WHERE
          id = $1
        "#,
        account_id
    )
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to update project: {e}"),
        )
    })?;

    if let Some(existing_token) = existing_token {
        if !existing_token.is_empty() {
            return Ok(Json(existing_token));
        }
    }

    let token = uuid::Uuid::new_v4().to_string();
    sqlx::query_scalar!(
        r#"
        UPDATE
          projects
        SET
          backers_digest = jsonb_set(
            backers_digest,
            '{token}',
            $1,
            FALSE
          )
        WHERE
          id = $2 RETURNING backers_digest ->> 'token'
        "#,
        serde_json::to_value(token.clone()).map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to update project: {e}"),
            )
        })?,
        account_id
    )
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to update project: {e}"),
        )
    })
    .map(|r| {
        Json(
            r.ok_or_else(|| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Failed to update project"),
                )
            })
            .unwrap(),
        )
    })
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", get(all_projects))
        .route("/count", get(projects_count))
        .route("/completion", get(get_completion))
        .route("/:account_id/similar", get(get_similar_projects))
        .route("/:account_id", put(put_project))
        .route("/:account_id/changes", get(changes))
        .route(
            "/:account_id/backers-digest",
            get(backers_digest)
                .put(backers_digest_edit)
                .post(add_backers_digest_token),
        )
}
