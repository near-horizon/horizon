use std::collections::{HashMap, HashSet};

use futures::StreamExt;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_jsonrpc_primitives::types::query::{QueryResponseKind, RpcQueryRequest, RpcQueryResponse};
use near_primitives::{
    types::{BlockReference, Finality::Final, FunctionArgs},
    views::{CallResult, QueryRequest},
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

pub mod claims;
pub mod contribution;
pub mod investor;
pub mod project;
pub mod request;
pub mod vendor;

const CONCURRENCY: usize = 10;

#[derive(Serialize, Deserialize, Clone, Default, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Nft {
    contract_id: String,
    token_id: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
#[serde(untagged)]
pub enum Image {
    Img {
        img: String,
    },
    Url {
        url: String,
    },
    Ipfs {
        ipfs_cid: String,
    },
    Nft {
        nft: Nft,
    },
    #[default]
    None,
}

impl Image {
    pub fn is_empty(&self) -> bool {
        match self {
            Image::Img { img } => img.is_empty(),
            Image::Url { url } => url.is_empty(),
            Image::Ipfs { ipfs_cid } => ipfs_cid.is_empty(),
            Image::Nft { nft } => nft.contract_id.is_empty() && nft.token_id.is_empty(),
            Image::None => true,
        }
    }
}

pub trait Completion
where
    Self: Sized,
{
    fn completion(&self) -> (u8, u8);

    fn avarage_completion<I>(entries: I) -> f64
    where
        I: Iterator<Item = Self>,
    {
        let (sum, count) = entries
            .into_iter()
            .map(|entry| entry.completion())
            .fold((0f64, 0usize), |(sum, count), (completed, total)| {
                (sum + completed as f64 / total as f64, count + 1)
            });
        sum / count as f64
    }

    fn count_with_min_completion<I>(min: u8, entries: I) -> usize
    where
        I: Iterator<Item = Self>,
    {
        entries
            .into_iter()
            .filter(|entry| entry.completion().0 > min)
            .count()
    }
}

#[async_trait::async_trait]
pub trait FetchAll
where
    Self: Sized + for<'a> Deserialize<'a> + Serialize + Clone + Send,
{
    type Horizon: Sized + for<'a> Deserialize<'a> + Serialize + Clone + Send;

    async fn get_ids(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
    ) -> anyhow::Result<HashSet<AccountId>>;

    async fn get_details(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
        id: AccountId,
    ) -> anyhow::Result<(AccountId, Self::Horizon)>;

    async fn get_batch(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
        ids: Vec<AccountId>,
        batch: HashMap<AccountId, Value>,
    ) -> anyhow::Result<HashMap<AccountId, Value>> {
        futures::stream::iter(
            ids.into_iter()
                .map(|id| async { Self::get_details(client, horizon_account, id).await }),
        )
        .buffer_unordered(CONCURRENCY)
        .collect::<Vec<anyhow::Result<_>>>()
        .await
        .into_iter()
        .try_fold(batch, |mut acc, result| {
            let (id, details) = result?;
            acc.entry(id)
                .and_modify(|data| {
                    data.as_object_mut().unwrap().insert(
                        "horizon".to_string(),
                        serde_json::to_value(details.clone()).unwrap(),
                    );
                })
                .or_insert_with(|| {
                    let mut data = serde_json::Map::new();
                    data.insert(
                        "horizon".to_string(),
                        serde_json::to_value(details).unwrap(),
                    );
                    data.into()
                });
            anyhow::Ok::<HashMap<AccountId, Value>>(acc)
        })
    }

    async fn get_data(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
        social_account: &AccountId,
        ids: &[AccountId],
    ) -> anyhow::Result<HashMap<AccountId, Self>> {
        let mut profiles = HashMap::new();

        let chunk_size = 10;

        let batch_count = ids.len() / chunk_size + 1;

        for (batch_index, batch) in ids.chunks(chunk_size).enumerate() {
            eprintln!("Fetching batch {} of {batch_count}...", batch_index + 1);
            let (keys, accounts): (Vec<String>, Vec<AccountId>) = batch
                .iter()
                .map(|id| (format!("{id}/profile/**"), id.clone()))
                .unzip();

            let keys = json!({ "keys": keys }).to_string().into_bytes();

            let profiles_batch = get_social_keys(client, social_account, keys).await?;

            let details_batch =
                Self::get_batch(client, horizon_account, accounts, profiles_batch).await?;

            profiles.extend(details_batch.into_iter().map(|(k, v)| {
                (k.clone(), {
                    let mut v = v;
                    v.as_object_mut()
                        .unwrap()
                        .insert("id".to_string(), k.to_string().into());
                    serde_json::from_value(v.clone()).unwrap_or_else(|_| {
                        panic!("Failed to deserialize profile for account {:#?}", v)
                    })
                })
            }));
        }

        anyhow::Ok(profiles)
    }

    async fn fetch_all(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
        social_account: &AccountId,
    ) -> anyhow::Result<HashMap<AccountId, Self>> {
        eprintln!("Fetching ids from {horizon_account}...");
        let ids = Self::get_ids(client, horizon_account).await?;
        eprintln!("Fetching data from {horizon_account} and {social_account}...");
        Self::get_data(
            client,
            horizon_account,
            social_account,
            &ids.into_iter().collect_vec(),
        )
        .await
    }
}

pub fn empty_args() -> FunctionArgs {
    FunctionArgs::from(json!({}).to_string().into_bytes())
}

pub async fn view_function_call(
    client: &JsonRpcClient,
    request: QueryRequest,
) -> anyhow::Result<Vec<u8>> {
    let RpcQueryResponse { kind, .. } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Final),
            request,
        })
        .await?;

    let QueryResponseKind::CallResult(CallResult{result, ..}) = kind else {
      anyhow::bail!("Unexpected response kind");
    };

    Ok(result)
}

pub async fn get_social_keys(
    client: &JsonRpcClient,
    account_id: &AccountId,
    keys: Vec<u8>,
) -> anyhow::Result<HashMap<AccountId, Value>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: account_id.clone(),
            method_name: "get".to_string(),
            args: FunctionArgs::from(keys),
        },
    )
    .await?;

    anyhow::Ok(serde_json::from_slice(&result)?)
}
