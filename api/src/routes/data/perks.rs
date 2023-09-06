use axum::{
    debug_handler,
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};
use near_jsonrpc_primitives::types::query::QueryResponseKind;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

use crate::{ApiResult, AppState};

pub async fn is_claimed(
    pool: &sqlx::PgPool,
    perk_id: String,
    amount: u64,
    account_id: String,
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
    let project: Project = match project_response.kind {
        QueryResponseKind::CallResult(result) => {
            serde_json::from_slice(&result.result).map_err(|e| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Failed to parse project: {}", e),
                )
            })?
        }
        _ => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to get project".to_string(),
            ))
        }
    };
    if project.credits < perk.price.into() {
        return Err((
            StatusCode::BAD_REQUEST,
            "Not enough credits to claim perk".to_string(),
        ));
    }
    let claimed = is_claimed(&state.pool, perk_id.clone(), perk.price, account_id.clone()).await?;
    if claimed {
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
    let claimed = is_claimed(&state.pool, perk_id.clone(), perk.price, account_id.clone()).await?;
    Ok(Json(claimed))
}

#[debug_handler(state = AppState)]
async fn get_perks(
    State(state): State<AppState>,
) -> ApiResult<Json<Vec<crate::fetching::PerkResponse>>> {
    let perks = crate::fetching::get_perks(state.clone()).await?;
    Ok(Json(
        perks
            .into_iter()
            .filter(|p| p.fields.available > 0)
            .collect(),
    ))
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", post(claim_perk).get(get_perks))
        .route("/:account_id/:perk_id", get(check_claimed))
}
