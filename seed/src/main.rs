use std::path::Path;

use chrono::{prelude::*, Utc};
use near_account_id::AccountId;
use near_crypto::InMemorySigner;
use near_jsonrpc_client::methods::broadcast_tx_commit::RpcBroadcastTxCommitRequest;
use near_jsonrpc_client::methods::query::{RpcQueryRequest, RpcQueryResponse};
use near_jsonrpc_client::JsonRpcClient;
use near_jsonrpc_primitives::types::query::QueryResponseKind;
use near_primitives::transaction::{Action, FunctionCallAction, Transaction};
use near_primitives::types::{BlockReference, Finality};
use near_primitives::views::AccessKeyView;
use serde::{Deserialize, Serialize};

const TGAS: u64 = 1_000_000_000_000;

#[derive(Debug, Deserialize, Clone)]
#[allow(dead_code)]
struct Record {
    timestamp: String,
    email: String,
    name: String,
    description: String,
    url: String,
    account_id: AccountId,
    founder_id: AccountId,
    github: String,
}

#[derive(Serialize)]
struct AddEntityParams {
    account_id: AccountId,
    founder_id: AccountId,
    name: String,
    kind: String,
    start_date: String,
}

impl From<Record> for AddEntityParams {
    fn from(value: Record) -> Self {
        Self {
            account_id: value.account_id,
            founder_id: value.founder_id,
            name: value.name,
            kind: "Project".to_string(),
            start_date: match Utc.datetime_from_str(&value.timestamp, "%m/%d/%Y %H:%M:%S") {
                Ok(v) => v.format("%s").to_string(),
                Err(e) => {
                    dbg!(e, value.timestamp);
                    panic!("Error parsing timestamp!")
                }
            },
        }
    }
}

fn read_entries(filename: &str) -> Vec<Record> {
    let file_contents = std::fs::read_to_string(filename).expect("Error reading file!");

    let mut reader = csv::ReaderBuilder::new()
        .has_headers(false)
        .from_reader(file_contents.as_bytes());

    reader
        .deserialize()
        .filter_map(|r| match r {
            Ok(v) => Some(v),
            Err(_) => None,
        })
        .map(|r: Record| Record {
            github: r.github.to_lowercase(),
            url: r.url.to_lowercase(),
            ..r
        })
        .map(|entry| {
            let url = if entry.url.starts_with("https://") {
                String::from(entry.url.get("https://".len()..).unwrap())
            } else if entry.url.starts_with("http://") {
                String::from(entry.url.get("http://".len()..).unwrap())
            } else {
                entry.url.clone()
            };

            let github = if entry.github.starts_with("https://github.com/") {
                String::from(entry.github.get("https://gihtub.com/".len()..).unwrap())
            } else if entry.github.starts_with("http://github.com/") {
                String::from(entry.github.get("http://gihtub.com/".len()..).unwrap())
            } else if entry.github.starts_with("github.com/") {
                String::from(entry.github.get("gihtub.com/".len()..).unwrap())
            } else {
                entry.github.clone()
            };

            let timestamp = if entry.timestamp.find('/').unwrap() < 2 {
                format!("0{}", entry.timestamp)
            } else {
                entry.timestamp.clone()
            };

            Record {
                url,
                github,
                timestamp,
                ..entry
            }
        })
        .collect()
}

fn get_signer(filename: &str) -> InMemorySigner {
    InMemorySigner::from_file(Path::new(filename)).expect("Error reading key file!")
}

fn create_action(record: &Record, gas: u64) -> Action {
    Action::FunctionCall(FunctionCallAction {
        method_name: "admin_add_entity".to_string(),
        args: serde_json::to_vec(&AddEntityParams::from(record.clone())).unwrap(),
        deposit: 0,
        gas,
    })
}

#[tokio::main]
async fn main() {
    let data_path = std::env::var("DATA_PATH").unwrap_or("./data.csv".to_string());
    let key_path = std::env::var("KEY_PATH").expect("Missing KEY_PATH!");
    let receiver_id = std::env::var("RECEIVER_ID")
        .unwrap_or("contribut3.near".to_string())
        .parse()
        .expect("Invalid RECEIVER_ID!");

    let entries = read_entries(&data_path);
    let gas = TGAS * 300 / entries.len() as u64;

    let actions = entries
        .iter()
        .map(|entry| create_action(entry, gas))
        .collect::<Vec<Action>>();

    let client = JsonRpcClient::connect("https://rpc.mainnet.near.org");

    let signer = get_signer(&key_path);

    let Ok(RpcQueryResponse {
        kind, block_hash, ..
    }) = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Finality::Final),
            request: near_primitives::views::QueryRequest::ViewAccessKey {
                account_id: signer.account_id.clone(),
                public_key: signer.public_key.clone(),
            },
        })
        .await else {
            panic!("Error querying access key!");
        };

    let QueryResponseKind::AccessKey(AccessKeyView{nonce, ..}) = kind else {
        panic!("Error querying access key!");
    };

    let signed_transaction = Transaction {
        signer_id: signer.account_id.clone(),
        public_key: signer.public_key.clone(),
        receiver_id,
        block_hash,
        actions,
        nonce: nonce + 1,
    }
    .sign(&signer);

    client
        .call(RpcBroadcastTxCommitRequest { signed_transaction })
        .await
        .expect("Error sending transaction!");
}
