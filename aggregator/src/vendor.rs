use std::collections::{HashMap, HashSet};

use horizon::vendor::Vendor as HorizonVendor;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::json;
use sqlx::PgPool;

use crate::{empty_args, view_function_call, Completion, FetchAll, Image};

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
#[serde(rename_all = "lowercase")]
pub enum VendorType {
    #[default]
    Individual,
    Organization,
}

#[derive(Serialize, Deserialize, PartialEq, Eq, Clone, Debug, Default, Hash)]
#[serde(rename_all = "lowercase")]
pub enum Payment {
    #[default]
    Fiat,
    Crypto,
    Credits,
}

#[derive(Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default, Hash)]
#[serde(rename_all = "lowercase")]
pub enum Work {
    #[default]
    OneTime,
    Short,
    Long,
    FullTime,
}

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Social {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub services: String,
    #[serde(default)]
    pub tagline: String,
    #[serde(default)]
    pub image: Image,
    #[serde(default)]
    pub website: String,
    #[serde(default)]
    pub linktree: HashMap<String, String>,
    #[serde(default, deserialize_with = "deserialize_social_bool")]
    pub active: bool,
    #[serde(default)]
    pub location: String,
    #[serde(default)]
    pub vendor_type: VendorType,
    #[serde(default)]
    pub payments: HashMap<Payment, String>,
    #[serde(default, deserialize_with = "deserialize_social_u32")]
    pub rate: u32,
    #[serde(default)]
    pub work: HashMap<Work, String>,
}

pub fn deserialize_social_bool<'de, D>(deserializer: D) -> std::result::Result<bool, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    Ok(&s == "true")
}

pub fn deserialize_social_u32<'de, D>(deserializer: D) -> std::result::Result<u32, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    Ok(s.parse::<u32>().unwrap_or(0))
}

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Vendor {
    #[serde(default)]
    pub id: String,
    pub horizon: HorizonVendor,
    #[serde(default)]
    pub profile: Social,
}

impl Completion for Vendor {
    fn completion(&self) -> (u8, u8) {
        let field_completion = [
            self.profile.name.is_empty(),
            self.profile.description.is_empty(),
            self.profile.services.is_empty(),
            self.profile.tagline.is_empty(),
            self.profile.image.is_empty(),
            self.profile.website.is_empty(),
            self.profile.linktree.is_empty(),
            self.profile.location.is_empty(),
            self.profile.payments.is_empty(),
            self.profile.rate == 0,
            self.profile.work.is_empty(),
        ];
        (
            field_completion.iter().filter(|&x| !x).count() as u8,
            field_completion.len() as u8,
        )
    }
}

pub async fn insert_many(pool: &PgPool, vendors: Vec<Vendor>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for vendor in vendors {
        sqlx::query!(
            "INSERT INTO vendors (
                    id,
                    permissions,
                    verified,
                    name,
                    description,
                    services,
                    tagline,
                    image,
                    website,
                    linktree,
                    active,
                    location,
                    vendor_type,
                    payments,
                    rate,
                    work,
                    credits
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15, $16, $17
                ) ON CONFLICT (id) DO
                UPDATE SET
                    permissions = EXCLUDED.permissions,
                    verified = EXCLUDED.verified,
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    services = EXCLUDED.services,
                    tagline = EXCLUDED.tagline,
                    image = EXCLUDED.image,
                    website = EXCLUDED.website,
                    linktree = EXCLUDED.linktree,
                    active = EXCLUDED.active,
                    location = EXCLUDED.location,
                    vendor_type = EXCLUDED.vendor_type,
                    payments = EXCLUDED.payments,
                    rate = EXCLUDED.rate,
                    work = EXCLUDED.work,
                    credits = EXCLUDED.credits;
                ",
            vendor.id,
            serde_json::to_value(vendor.horizon.permissions)?,
            vendor.horizon.verified,
            vendor.profile.name,
            vendor.profile.description,
            vendor.profile.services,
            vendor.profile.tagline,
            &serde_json::to_string(&vendor.profile.image)?,
            vendor.profile.website,
            serde_json::to_value(vendor.profile.linktree)?,
            vendor.profile.active,
            vendor.profile.location,
            serde_json::to_string(&vendor.profile.vendor_type)?,
            &vendor
                .profile
                .payments
                .keys()
                .map(|key| serde_json::to_string(key).expect("Failed to serialize payment"))
                .collect_vec(),
            vendor.profile.rate as i32,
            &vendor
                .profile
                .work
                .keys()
                .map(|key| serde_json::to_string(key).expect("Failed to serialize work"))
                .collect_vec(),
            vendor.horizon.credits,
        )
        .execute(&mut tx)
        .await
        .expect("Failed to insert vendor");
    }

    Ok(tx.commit().await?)
}

#[async_trait::async_trait]
impl FetchAll for Vendor {
    type Horizon = HorizonVendor;

    async fn get_ids(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
    ) -> anyhow::Result<HashSet<AccountId>> {
        let result = view_function_call(
            client,
            QueryRequest::CallFunction {
                account_id: horizon_account.clone(),
                method_name: "get_vendors".to_string(),
                args: empty_args(),
            },
        )
        .await?;

        Ok(serde_json::from_slice(&result)?)
    }

    async fn get_details(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
        id: AccountId,
    ) -> anyhow::Result<(AccountId, Self::Horizon)> {
        let result = view_function_call(
            client,
            QueryRequest::CallFunction {
                account_id: horizon_account.clone(),
                method_name: "get_vendor".to_string(),
                args: FunctionArgs::from(json!({ "account_id": id }).to_string().into_bytes()),
            },
        )
        .await?;

        Ok((id, serde_json::from_slice(&result)?))
    }
}
