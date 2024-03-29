use std::str::FromStr;

use axum::http::HeaderMap;
use base58::{FromBase58, ToBase58};
use ed25519_dalek::{PublicKey, Signature, Verifier};

use near_primitives::types::AccountId;
use reqwest::{Client, StatusCode};
use serde_json::json;
use sodiumoxide::base64::{self, Variant};

use crate::{ApiResult, AppState, RPC_URL};

pub async fn verify_public_key(public_key: &str, account_id: &str, client: &Client) -> bool {
    let Ok(account_id) = AccountId::from_str(account_id) else {
        return false;
    };
    let decoded = hex::decode(public_key.as_bytes()).unwrap().to_base58();
    let result = client
        .post(RPC_URL)
        .json(&json!({
            "jsonrpc": "2.0",
            "id": "dontcare",
            "method": "query",
            "params": {
                "request_type": "view_access_key",
                "finality": "final",
                "account_id": account_id.to_string(),
                "public_key": format!("ed25519:{decoded}"),
            }
        }))
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    result.get("error").is_none()
}

pub async fn verify_recency(hash: &str, client: &Client) -> bool {
    let result = client
        .post(RPC_URL)
        .json(&json!({
            "jsonrpc": "2.0",
            "id": "dontcare",
            "method": "block",
            "params": {
              "finality": "final",
            }
        }))
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    let Some(result) = result.get("result") else {
        return false;
    };
    let Some(header) = result.get("header") else {
        return false;
    };
    let current_hash = header.get("hash").unwrap().as_str().unwrap();
    let previous_hash = header.get("prev_hash").unwrap().as_str().unwrap();
    hash == current_hash || hash == previous_hash
}

pub async fn authenticate(headers: HeaderMap, client: &Client, body: &str) -> ApiResult<AccountId> {
    let Some(public_key) = headers.get("X-Near-Public-Key") else {
        return Err((StatusCode::UNAUTHORIZED, "Missing public key".to_string()));
    };
    let public_key = public_key.to_str().unwrap();

    let Some(account_id) = headers.get("X-Near-Account-Id") else {
        return Err((StatusCode::UNAUTHORIZED, "Missing account id".to_string()));
    };
    let account_id = account_id.to_str().unwrap();

    let Some(signature) = headers.get("X-Near-Signature") else {
        return Err((StatusCode::UNAUTHORIZED, "Missing signature".to_string()));
    };
    let signature = signature.to_str().unwrap();

    let Some(hash) = headers.get("X-Near-Block-Hash") else {
        return Err((StatusCode::UNAUTHORIZED, "Missing block hash".to_string()));
    };
    let hash = hash.to_str().unwrap();

    if !verify_public_key(public_key, account_id, client).await {
        return Err((StatusCode::UNAUTHORIZED, "Invalid public key".to_string()));
    }

    if !verify_recency(hash, client).await {
        return Err((StatusCode::UNAUTHORIZED, "Invalid block hash".to_string()));
    }

    let message = format!("{account_id}\n{public_key}\n{hash}\n{body}");
    if !verify_signature(&message, signature, public_key).await {
        return Err((StatusCode::UNAUTHORIZED, "Invalid signature".to_string()));
    }

    Ok(AccountId::from_str(account_id).unwrap())
}

pub async fn verify_permissions(
    account_id: AccountId,
    project_id: AccountId,
    contract_id: AccountId,
    client: &Client,
) -> bool {
    let args = base64::encode(
        json!({
            "account_id": account_id.to_string(),
            "project_id": project_id.to_string(),
        })
        .to_string(),
        Variant::OriginalNoPadding,
    );
    let body = json!({
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "query",
      "params": {
        "request_type": "call_function",
        "finality": "final",
        "account_id": contract_id.to_string(),
        "method_name": "check_is_project_admin",
        "args_base64": args,
      }
    });
    let result = client
        .post(RPC_URL)
        .json(&body)
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    let Some(result) = result.get("result") else {
        return false;
    };
    let Some(result) = result.get("result") else {
        return false;
    };
    let s = String::from_utf8(
        result
            .as_array()
            .unwrap()
            .iter()
            .map(|v| v.as_u64().unwrap() as u8)
            .collect::<Vec<u8>>(),
    )
    .unwrap();
    bool::from_str(&s).unwrap()
}

pub async fn authorize(
    headers: HeaderMap,
    body: &str,
    project_id: AccountId,
    state: AppState,
) -> ApiResult<()> {
    let account_id = authenticate(headers, &state.client, body).await?;
    if verify_permissions(account_id, project_id, state.contract_id, &state.client).await {
        Ok(())
    } else {
        Err((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))
    }
}

pub fn encrypt_string(value: &str, key: &sodiumoxide::crypto::secretbox::Key) -> String {
    if value.is_empty() {
        return String::new();
    }
    let nonce = sodiumoxide::crypto::secretbox::gen_nonce();
    let encrypted = sodiumoxide::crypto::secretbox::seal(value.as_bytes(), &nonce, key);
    let encoded = encrypted.to_base58();
    let encoded_nonce = nonce.0.to_base58();
    format!("{encoded_nonce}:{encoded}")
}

pub fn decrypt_string(value: &str, key: &sodiumoxide::crypto::secretbox::Key) -> String {
    if value.is_empty() {
        return String::new();
    }
    let split = value.split(':').collect::<Vec<&str>>();
    let nonce_encoded = split.first().unwrap().from_base58().unwrap();
    let ciphertext_encoded = split.last().unwrap().from_base58().unwrap();
    let nonce = sodiumoxide::crypto::secretbox::Nonce::from_slice(&nonce_encoded).unwrap();
    String::from_utf8(
        sodiumoxide::crypto::secretbox::open(&ciphertext_encoded, &nonce, key).unwrap(),
    )
    .unwrap()
}

pub async fn verify_signature(message: &str, signature: &str, public_key: &str) -> bool {
    let public_key = hex::decode(public_key.as_bytes()).unwrap();
    let Ok(public_key) = PublicKey::from_bytes(&public_key) else {
        return false;
    };
    let signature = hex::decode(signature.as_bytes()).unwrap();
    let Ok(signature) = Signature::from_bytes(&signature) else {
        return false;
    };
    public_key.verify(message.as_bytes(), &signature).is_ok()
}

pub async fn authorize_bearer(headers: &HeaderMap, state: &AppState) -> ApiResult<()> {
    let Some(authorization) = headers.get("Authorization") else {
        return Err((
            StatusCode::UNAUTHORIZED,
            "Missing authorization".to_string(),
        ));
    };
    let authorization = authorization.to_str().unwrap();
    let split = authorization.split(' ').collect::<Vec<&str>>();
    if split.len() != 2 || split.first().unwrap() != &"Bearer" {
        return Err((
            StatusCode::UNAUTHORIZED,
            "Invalid authorization".to_string(),
        ));
    }
    if split.last().unwrap() == &state.bearer_key {
        Ok(())
    } else {
        Err((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))
    }
}
