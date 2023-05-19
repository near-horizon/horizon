use std::collections::HashMap;

use futures::stream::StreamExt;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::{methods::query::RpcQueryRequest, JsonRpcClient, NEAR_MAINNET_RPC_URL};
use near_jsonrpc_primitives::types::query::{QueryResponseKind, RpcQueryResponse};
use near_primitives::{
    types::{BlockReference, Finality::Final, FunctionArgs},
    views::{CallResult, QueryRequest::CallFunction},
};
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = JsonRpcClient::connect(NEAR_MAINNET_RPC_URL);
    let account_id = "nearhorizon.near".parse().unwrap();

    let RpcQueryResponse { kind, .. } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Final),
            request: CallFunction {
                account_id,
                method_name: "get_projects".to_string(),
                args: FunctionArgs::from(json!({}).to_string().into_bytes()),
            },
        })
        .await?;
    let QueryResponseKind::CallResult(CallResult{result, ..}) = kind else {
        panic!("Unexpected response kind");
    };

    let mut projects_profiles = HashMap::<AccountId, Value>::new();

    let projects: Vec<AccountId> = serde_json::from_slice(&result)?;

    for project_batch in &projects.iter().chunks(10) {
        let keys = project_batch
            .map(|project_id| (format!("{project_id}/profile/**"), project_id.clone()))
            .collect::<Vec<_>>();

        let accounts = keys
            .iter()
            .map(|(_, account)| account.clone())
            .collect::<Vec<_>>();
        let keys = keys.iter().map(|(key, _)| key).collect::<Vec<_>>();

        let keys = json!({ "keys": keys }).to_string().into_bytes();
        let account_id = "social.near".parse().unwrap();

        let RpcQueryResponse { kind, .. } = client
            .call(RpcQueryRequest {
                block_reference: BlockReference::Finality(Final),
                request: CallFunction {
                    account_id,
                    method_name: "get".to_string(),
                    args: FunctionArgs::from(keys),
                },
            })
            .await?;

        let QueryResponseKind::CallResult(CallResult{result, ..}) = kind else {
          panic!("Unexpected response kind");
        };

        let profiles_batch: HashMap<AccountId, Value> = serde_json::from_slice(&result)?;

        let details_batch = futures::stream::iter(
            accounts
                .iter()
                .map(|project_id| async { get_project(project_id.clone(), &client).await }),
        )
        .buffer_unordered(10)
        .collect::<Vec<Result<_, _>>>()
        .await
        .into_iter()
        .try_fold(profiles_batch, |mut acc, result| {
            let (project_id, details) = result?;
            acc.entry(project_id)
                .and_modify(|profile| {
                    profile
                        .as_object_mut()
                        .unwrap()
                        .insert("horizon".to_string(), details.clone());
                })
                .or_insert_with(|| {
                    let mut profile = serde_json::Map::new();
                    profile.insert("horizon".to_string(), details);
                    profile.into()
                });
            Ok::<HashMap<AccountId, Value>, Box<dyn std::error::Error>>(acc)
        })?;

        projects_profiles.extend(details_batch);
    }

    println!("{:#?}", json!(projects_profiles));
    let filled_out = projects_profiles
        .into_iter()
        .filter(|(_, value)| is_filled_out(value))
        .collect::<HashMap<_, _>>();
    println!("{:#?}/{:#?}", filled_out.len(), projects.len());

    Ok(())
}

async fn get_project(
    project_id: AccountId,
    client: &JsonRpcClient,
) -> Result<(AccountId, Value), Box<dyn std::error::Error>> {
    let account_id = "nearhorizon.near".parse().unwrap();

    let RpcQueryResponse { kind, .. } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Final),
            request: CallFunction {
                account_id,
                method_name: "get_project".to_string(),
                args: FunctionArgs::from(
                    json!({ "account_id": project_id }).to_string().into_bytes(),
                ),
            },
        })
        .await?;
    let QueryResponseKind::CallResult(CallResult{result, ..}) = kind else {
                panic!("Unexpected response kind");
            };

    let details: Value = serde_json::from_slice(&result)?;

    Ok((project_id, details))
}

fn is_not_null(value: &Value) -> bool {
    match value {
        Value::Null => false,
        Value::Array(array) => !array.is_empty() && array.iter().any(is_not_null),
        Value::Object(object) => !object.is_empty() && object.values().any(is_not_null),
        Value::String(string) => !string.is_empty(),
        _ => true,
    }
}

fn is_filled_out(value: &Value) -> bool {
    let Some(profile) = value.get("profile") else {return false};
    let base = profile.get("name").map(is_not_null).unwrap_or(false)
        && profile.get("description").map(is_not_null).unwrap_or(false);
    if !base {
        return false;
    }

    let Some(horizon) = value.get("horizon") else {return false};

    [
        "integration",
        "why",
        "vision",
        "geo",
        "success_position",
        "team",
        "problem",
        "deck",
        "white_paper",
        "roadmap",
        "team_deck",
        "demo",
        "tam",
    ]
    .iter()
    .any(|key| horizon.get(key).map(is_not_null).unwrap_or(false))
        || [
            "linktree", "website", "logo", "tagline", "vertical", "category", "stage", "userbase",
        ]
        .iter()
        .all(|key| profile.get(key).map(is_not_null).unwrap_or(false))
}
