use auth::{decrypt_string, encrypt_string};
use near_account_id::AccountId;
use reqwest::Client;
use serde::{Deserialize, Serialize};

pub mod auth;
pub mod routes;

pub const RPC_URL: &str = "https://rpc.mainnet.near.org";

#[derive(Serialize, Deserialize, Default, Debug)]
pub struct PrivateGraduation {
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
pub struct PrivateData {
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
pub struct AppState {
    pub client: Client,
    pub contract_id: AccountId,
    pub atlas_route: String,
    pub atlas_auth: String,
    pub key: sodiumoxide::crypto::secretbox::Key,
    pub pool: sqlx::PgPool,
}

pub fn ensure_var(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| panic!("{name} must be set"))
}
