use axum::{
    debug_handler,
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};
use futures::StreamExt;
use itertools::Itertools;
use near_jsonrpc_primitives::types::query::QueryResponseKind;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiError, ApiResult, AppState};

pub async fn is_claimed(
    pool: &sqlx::PgPool,
    perk_id: String,
    amount: u64,
    account_id: &str,
) -> ApiResult<bool> {
    sqlx::query!(
        r#"
        SELECT
          hash
        FROM
          transactions
        WHERE
          method_name = 'spend_credits'
          AND args ->> 'account_id' = $1
          AND args ->> 'amount' = $2
          AND args ->> 'note' = $3
          AND success
        "#,
        account_id,
        amount.to_string(),
        perk_id,
    )
    .fetch_optional(pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch from db {e}"),
        )
    })
    .map(|r| r.is_some())
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
    #[serde(rename = "credit_balance")]
    pub credits: u128,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
struct PerkClaim {
    perk_id: String,
    account_id: String,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
struct PerkDetails {
    url: String,
    code: Option<String>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct CompletePerk {
    #[serde(flatten)]
    response: crate::fetching::PerkResponse,
    #[serde(flatten)]
    details: PerkDetails,
    claimed: bool,
}

#[debug_handler(state = AppState)]
async fn claim_perk(
    State(state): State<AppState>,
    Json(PerkClaim {
        perk_id,
        account_id,
    }): Json<PerkClaim>,
) -> ApiResult<Json<PerkDetails>> {
    let perk = crate::fetching::get_perk(state.clone(), perk_id.clone()).await?;
    let project_response = crate::chain_actions::call_view(
        &state.rpc_client,
        crate::chain_actions::ContractView {
            contract_id: state.contract_id.clone(),
            options: crate::chain_actions::ContractViewOptions::GetProject {
                project_id: account_id.clone(),
            },
        },
    )
    .await?;
    let project = match project_response.kind {
        QueryResponseKind::CallResult(result) => serde_json::from_slice::<Project>(&result.result)
            .map_err(|e| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Failed to parse project: {}", e),
                )
            })?,
        _ => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to get project".to_string(),
            ))
        }
    };
    let db_project = sqlx::query!(
        r#"
        SELECT
          completion
        FROM
          projects
        WHERE
          id = $1
        "#,
        account_id,
    )
    .fetch_optional(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get project from db: {}", e),
        )
    })?;
    let completion = if let Some(db_project) = db_project {
        db_project.completion
    } else {
        0.0
    };
    for requirement in perk.requiremets {
        if !requirement.check_if_met(completion) {
            return Err((
                StatusCode::BAD_REQUEST,
                "Perk does not meet requirements".to_string(),
            ));
        }
    }
    if project.credits < perk.price.into() {
        return Err((
            StatusCode::BAD_REQUEST,
            "Not enough credits to claim perk".to_string(),
        ));
    }
    let claimed = is_claimed(&state.pool, perk_id.clone(), perk.price, &account_id).await?;
    if !claimed {
        crate::chain_actions::call_contract(
            &state.signer,
            &state.rpc_client,
            &state.contract_id,
            crate::chain_actions::ContractAction::ClaimPerk {
                perk_id: perk_id.clone(),
                account_id: account_id.parse().unwrap(),
                amount: perk.price.into(),
            },
        )
        .await?;
    }
    Ok(Json(PerkDetails {
        url: perk.url,
        code: perk.code,
    }))
}

#[debug_handler(state = AppState)]
async fn check_claimed(
    State(state): State<AppState>,
    Path(PerkClaim {
        perk_id,
        account_id,
    }): Path<PerkClaim>,
) -> ApiResult<Json<bool>> {
    let perk = crate::fetching::get_perk(state.clone(), perk_id.clone()).await?;
    let claimed = is_claimed(&state.pool, perk_id.clone(), perk.price, &account_id).await?;
    Ok(Json(claimed))
}

#[debug_handler(state = AppState)]
async fn get_perks(
    State(state): State<AppState>,
) -> ApiResult<Json<Vec<crate::fetching::PerkResponse>>> {
    let perks = crate::fetching::get_perks(state.clone()).await?;
    Ok(Json(
        perks.into_iter().filter(|p| p.fields.available).collect(),
    ))
}

#[debug_handler(state = AppState)]
async fn get_account_perks(
    Path(account_id): Path<String>,
    State(state): State<AppState>,
) -> ApiResult<Json<Vec<CompletePerk>>> {
    let perks = crate::fetching::get_perks(state.clone()).await?;
    futures::stream::iter(
        perks
            .into_iter()
            .filter(|p| p.fields.available)
            .map(|p| (p, account_id.clone(), state.pool.clone())),
    )
    .map(move |(perk, id, pool)| async move {
        let claimed = is_claimed(&pool, perk.id.clone(), perk.fields.price.clone(), &id)
            .await
            .unwrap_or(false);
        Ok::<CompletePerk, ApiError>(CompletePerk {
            details: claimed
                .then(|| PerkDetails {
                    url: perk.fields.url.clone(),
                    code: perk.fields.code.clone(),
                })
                .unwrap_or_default(),
            response: perk,
            claimed,
        })
    })
    .buffer_unordered(10)
    .collect::<Vec<_>>()
    .await
    .into_iter()
    .try_collect()
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Could not fetch from db: {e:?}"),
        )
    })
    .map(Json)
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", post(claim_perk).get(get_perks))
        .route("/:account_id", get(get_account_perks))
        .route("/:account_id/:perk_id", get(check_claimed))
}
