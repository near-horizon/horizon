use std::{
    collections::{HashMap, HashSet},
    error::Error,
};

use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_jsonrpc_primitives::types::query::{QueryResponseKind, RpcQueryRequest, RpcQueryResponse};
use near_primitives::{
    types::{BlockReference, Finality::Final, FunctionArgs},
    views::{CallResult, QueryRequest},
};
use serde::{Deserialize, Serialize};
use serde_json::json;

pub mod investor;
pub mod project;
pub mod request;
pub mod vendor;

pub mod u64_dec_format {
    use serde::de;
    use serde::{Deserialize, Deserializer, Serializer};

    pub fn serialize<S>(num: &u64, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&num.to_string())
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<u64, D::Error>
    where
        D: Deserializer<'de>,
    {
        String::deserialize(deserializer)?
            .parse()
            .map_err(de::Error::custom)
    }
}

#[derive(Deserialize, Serialize, PartialEq, Eq, PartialOrd, Hash, Clone, Debug, Default)]
pub enum Permission {
    #[default]
    Admin,
}

pub type Permissions = HashMap<AccountId, HashSet<Permission>>;

pub fn empty_args() -> FunctionArgs {
    FunctionArgs::from(json!({}).to_string().into_bytes())
}

async fn view_function_call(
    client: &JsonRpcClient,
    request: QueryRequest,
) -> Result<Vec<u8>, Box<dyn Error>> {
    let RpcQueryResponse { kind, .. } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Final),
            request,
        })
        .await?;

    let QueryResponseKind::CallResult(CallResult{result, ..}) = kind else {
      panic!("Unexpected response kind");
    };

    Ok(result)
}
