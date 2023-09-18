use near_crypto::{InMemorySigner, PublicKey, Signer};
use near_jsonrpc_client::{
    methods::broadcast_tx_commit::RpcBroadcastTxCommitRequest, JsonRpcClient,
};
use near_jsonrpc_primitives::types::query::{QueryResponseKind, RpcQueryRequest, RpcQueryResponse};
use near_primitives::{
    hash::CryptoHash,
    transaction::{Action, FunctionCallAction, SignedTransaction},
    types::{AccountId, BlockReference, Finality, FunctionArgs},
    views::{FinalExecutionStatus, QueryRequest},
};
use reqwest::StatusCode;

use crate::ApiResult;

pub const TGAS: u64 = 1_000_000_000_000;
pub const XCC_GAS: u64 = 300 * TGAS;

pub async fn get_nonce(
    client: &JsonRpcClient,
    account_id: &AccountId,
    public_key: &PublicKey,
) -> ApiResult<(u64, CryptoHash)> {
    let RpcQueryResponse {
        kind, block_hash, ..
    } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Finality::Final),
            request: QueryRequest::ViewAccessKey {
                account_id: account_id.clone(),
                public_key: public_key.clone(),
            },
        })
        .await
        .map_err(|e| {
            (
                StatusCode::FAILED_DEPENDENCY,
                format!("Could not reach chain: {e}"),
            )
        })?;
    let nonce = match kind {
        QueryResponseKind::AccessKey(key_view) => key_view.nonce,
        _ => unreachable!(),
    };

    Ok((nonce, block_hash))
}

pub async fn view_contract(
    client: &JsonRpcClient,
    contract_id: &AccountId,
    method_name: &str,
    args: Vec<u8>,
) -> ApiResult<RpcQueryResponse> {
    client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Finality::Final),
            request: QueryRequest::CallFunction {
                account_id: contract_id.clone(),
                method_name: method_name.to_string(),
                args: FunctionArgs::from(args),
            },
        })
        .await
        .map_err(|e| {
            (
                StatusCode::FAILED_DEPENDENCY,
                format!("Could not reach chain: {e}"),
            )
        })
}

pub enum ContractViewOptions {
    GetProject { project_id: String },
}

impl ContractViewOptions {
    pub fn get_method_name(&self) -> String {
        match self {
            ContractViewOptions::GetProject { .. } => "get_project".to_string(),
        }
    }

    pub fn get_args(&self) -> FunctionArgs {
        match self {
            ContractViewOptions::GetProject { project_id } => FunctionArgs::from(
                serde_json::to_vec(&serde_json::json!({
                    "account_id": project_id,
                }))
                .unwrap(),
            ),
        }
    }
}

pub struct ContractView {
    pub contract_id: AccountId,
    pub options: ContractViewOptions,
}

impl From<ContractView> for QueryRequest {
    fn from(view: ContractView) -> Self {
        QueryRequest::CallFunction {
            account_id: view.contract_id,
            method_name: view.options.get_method_name(),
            args: view.options.get_args(),
        }
    }
}

pub async fn call_view(client: &JsonRpcClient, view: ContractView) -> ApiResult<RpcQueryResponse> {
    view_contract(
        client,
        &view.contract_id,
        &view.options.get_method_name(),
        view.options.get_args().to_vec(),
    )
    .await
}

pub enum ContractAction {
    ClaimPerk {
        perk_id: String,
        amount: u128,
        account_id: AccountId,
    },
}

impl ContractAction {
    pub fn get_method_name(&self) -> String {
        match self {
            ContractAction::ClaimPerk { .. } => "spend_credits".to_string(),
        }
    }

    pub fn get_args(&self) -> Vec<u8> {
        match self {
            ContractAction::ClaimPerk {
                perk_id,
                account_id,
                amount,
            } => serde_json::to_vec(&serde_json::json!({
                "account_id": account_id,
                "amount": amount,
                "note": perk_id,
            }))
            .unwrap(),
        }
    }
}

impl From<ContractAction> for Action {
    fn from(action: ContractAction) -> Self {
        Action::FunctionCall(FunctionCallAction {
            method_name: action.get_method_name(),
            args: action.get_args(),
            gas: XCC_GAS,
            deposit: 0,
        })
    }
}

pub async fn call_contract(
    signer: &InMemorySigner,
    client: &JsonRpcClient,
    contract_id: &AccountId,
    action: ContractAction,
) -> ApiResult<()> {
    let account_id = signer.account_id.clone();
    let public_key = signer.public_key();

    let (nonce, block_hash) = get_nonce(client, &account_id, &public_key).await?;

    let signed_transaction = SignedTransaction::from_actions(
        nonce + 1,
        contract_id.clone(),
        account_id.clone(),
        signer,
        vec![action.into()],
        block_hash,
    );

    let outcome = client
        .call(RpcBroadcastTxCommitRequest { signed_transaction })
        .await
        .expect("Failed to broadcast transaction");

    match outcome.status {
        FinalExecutionStatus::SuccessValue(_) => Ok(()),
        _ => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Transaction failed: {:?}", outcome.status),
        )),
    }
}
