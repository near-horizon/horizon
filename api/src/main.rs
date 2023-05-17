use std::str::FromStr;

use axum::{
    debug_handler,
    extract::{Path, State},
    http::{HeaderMap, StatusCode},
    routing::{get, post},
    Json, Router,
};
use base58::{FromBase58, ToBase58};
use ed25519_dalek::{PublicKey, Signature, Verifier};
use near_account_id::AccountId;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sodiumoxide::base64::{self, Variant};

#[allow(dead_code)]
fn generate_key() -> String {
    hex::encode(sodiumoxide::crypto::secretbox::gen_key().0)
}

#[derive(Serialize, Deserialize, Default, Debug)]
struct PrivateGraduation {
    #[serde(default)]
    pub legal: String,
    #[serde(default)]
    pub budget: String,
    #[serde(default)]
    pub monetazation: String,
    #[serde(default)]
    pub valuation: String,
    #[serde(default)]
    pub gtm: String,
}

impl PrivateGraduation {
    fn encrypt(&self, key: &sodiumoxide::crypto::secretbox::Key) -> Self {
        Self {
            legal: encrypt_string(&self.legal, key),
            budget: encrypt_string(&self.budget, key),
            monetazation: encrypt_string(&self.monetazation, key),
            valuation: encrypt_string(&self.valuation, key),
            gtm: encrypt_string(&self.gtm, key),
        }
    }

    fn decrypt(&self, key: &sodiumoxide::crypto::secretbox::Key) -> Self {
        Self {
            legal: decrypt_string(&self.legal, key),
            budget: decrypt_string(&self.budget, key),
            monetazation: decrypt_string(&self.monetazation, key),
            valuation: decrypt_string(&self.valuation, key),
            gtm: decrypt_string(&self.gtm, key),
        }
    }
}

#[derive(Serialize, Deserialize, Default, Debug)]
struct PrivateData {
    #[serde(default)]
    pub risks: String,
    #[serde(default)]
    pub needs: String,
    #[serde(default)]
    pub graduation: PrivateGraduation,
}

impl PrivateData {
    fn encrypt(&self, key: &sodiumoxide::crypto::secretbox::Key) -> Self {
        Self {
            risks: encrypt_string(&self.risks, key),
            needs: encrypt_string(&self.needs, key),
            graduation: self.graduation.encrypt(key),
        }
    }

    fn decrypt(&self, key: &sodiumoxide::crypto::secretbox::Key) -> Self {
        Self {
            risks: decrypt_string(&self.risks, key),
            needs: decrypt_string(&self.needs, key),
            graduation: self.graduation.decrypt(key),
        }
    }
}

#[derive(Clone)]
struct AppState {
    client: Client,
    contract_id: AccountId,
    total_fundraise_route: String,
    total_fundraise_auth: String,
    key: sodiumoxide::crypto::secretbox::Key,
    pool: sqlx::PgPool,
}

#[tokio::main]
async fn main() {
    let contract_id =
        AccountId::from_str(&std::env::var("CONTRACT_ID").expect("CONTRACT_ID must be set"))
            .expect("Invalid contract id");
    let key = hex::decode(std::env::var("ENCRYPTION_KEY").expect("ENCRYPTION_KEY must be set"))
        .expect("Invalid key");
    let key = sodiumoxide::crypto::secretbox::Key::from_slice(&key).expect("Invalid key");
    let port = std::env::var("PORT").unwrap_or("3000".to_string());
    let total_fundraise_route =
        std::env::var("TOTAL_FUNDRAISE_ROUTE").expect("TOTAL_FUNDRAISE_ROUTE must be set");
    let total_fundraise_auth =
        std::env::var("TOTAL_FUNDRAISE_AUTH").expect("TOTAL_FUNDRAISE_AUTH must be set");
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to connect to database");

    let state = AppState {
        client: Client::new(),
        contract_id,
        key,
        total_fundraise_route,
        total_fundraise_auth,
        pool,
    };

    let app = Router::new()
        .route("/decrypt/:account_id", post(decrypt))
        .route("/encrypt/:account_id", post(encrypt))
        .route("/total-raised", get(total_raised))
        .route("/transactions", get(get_transactions))
        .with_state(state);

    let address = format!("0.0.0.0:{port}");

    axum::Server::bind(&address.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn authorize(
    headers: HeaderMap,
    body: &str,
    project_id: AccountId,
    state: AppState,
) -> Result<(), (StatusCode, String)> {
    let account_id = authenticate(headers, &state.client, body).await?;
    if verify_permissions(account_id, project_id, state.contract_id, &state.client).await {
        Ok(())
    } else {
        Err((StatusCode::UNAUTHORIZED, "Unauthorized".to_string()))
    }
}

fn encrypt_string(value: &str, key: &sodiumoxide::crypto::secretbox::Key) -> String {
    if value.is_empty() {
        return String::new();
    }
    let nonce = sodiumoxide::crypto::secretbox::gen_nonce();
    let encrypted = sodiumoxide::crypto::secretbox::seal(value.as_bytes(), &nonce, key);
    let encoded = encrypted.to_base58();
    let encoded_nonce = nonce.0.to_base58();
    format!("{}:{}", encoded_nonce, encoded)
}

fn decrypt_string(value: &str, key: &sodiumoxide::crypto::secretbox::Key) -> String {
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

async fn verify_signature(message: &str, signature: &str, public_key: &str) -> bool {
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

const RPC_URL: &str = "https://rpc.mainnet.near.org";

async fn verify_public_key(public_key: &str, account_id: &str, client: &Client) -> bool {
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
                "public_key": format!("ed25519:{}", decoded),
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

async fn verify_recency(hash: &str, client: &Client) -> bool {
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

async fn authenticate(
    headers: HeaderMap,
    client: &Client,
    body: &str,
) -> Result<AccountId, (StatusCode, String)> {
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

async fn verify_permissions(
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

#[debug_handler(state = AppState)]
async fn decrypt(
    headers: HeaderMap,
    Path(project_id): Path<AccountId>,
    State(state): State<AppState>,
    Json(private_data): Json<PrivateData>,
) -> Result<Json<PrivateData>, (StatusCode, String)> {
    authorize(
        headers,
        &json!(private_data).to_string(),
        project_id,
        state.clone(),
    )
    .await?;
    Ok(Json(private_data.decrypt(&state.key)))
}

#[debug_handler(state = AppState)]
async fn encrypt(
    headers: HeaderMap,
    Path(project_id): Path<AccountId>,
    State(state): State<AppState>,
    Json(private_data): Json<PrivateData>,
) -> Result<Json<PrivateData>, (StatusCode, String)> {
    authorize(
        headers,
        &json!(private_data).to_string(),
        project_id,
        state.clone(),
    )
    .await?;
    Ok(Json(private_data.encrypt(&state.key)))
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Transaction {
    pub hash: String,
    pub signer_id: String,
    pub method_name: String,
    pub args: serde_json::Value,
    pub log: String,
    pub block_hash: String,
    pub timestamp: i64,
}

#[debug_handler(state = AppState)]
async fn get_transactions(
    State(AppState { pool, .. }): State<AppState>,
) -> Result<Json<Vec<Transaction>>, (StatusCode, String)> {
    Ok(sqlx::query_as!(
        Transaction,
        "SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 100"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to get transactions: {}", e),
        )
    })
    .map(Json)?)
}

#[debug_handler(state = AppState)]
async fn total_raised(State(state): State<AppState>) -> Result<Json<u64>, (StatusCode, String)> {
    let response = state
        .client
        .get(state.total_fundraise_route)
        .bearer_auth(&state.total_fundraise_auth)
        .send()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to get total supply: {}", e),
            )
        })?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to deserialize total supply: {}", e),
            )
        })?;
    let Some(fields) = response.get("fields") else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Missing fields in total supply response".to_string(),
        ));
    };
    let Some(total_fundraise) = fields.get("Total Fundraise") else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Missing total supply in total supply response".to_string(),
        ));
    };
    let Some(total_fundraise) = total_fundraise.as_u64() else {
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "Invalid total supply in total supply response".to_string(),
        ));
    };
    Ok(Json(total_fundraise))
}
