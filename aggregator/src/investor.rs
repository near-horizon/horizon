use std::collections::{HashMap, HashSet};

use horizon::investor::Investor as HorizonInvestor;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

use crate::{empty_args, view_function_call, Completion, FetchAll, Image};

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Social {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub tagline: String,
    #[serde(default)]
    pub image: Image,
    #[serde(default)]
    pub website: String,
    #[serde(default)]
    pub linktree: HashMap<String, String>,
    #[serde(default)]
    pub vertical: HashMap<String, String>,
    #[serde(default)]
    pub specialization: String,
    #[serde(default)]
    pub location: String,
}

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Investor {
    #[serde(default)]
    pub id: String,
    pub horizon: HorizonInvestor,
    #[serde(default)]
    pub profile: Social,
}

impl Completion for Investor {
    fn completion(&self) -> (u8, u8) {
        let field_completion = [
            self.profile.name.is_empty(),
            self.profile.description.is_empty(),
            self.profile.tagline.is_empty(),
            self.profile.image.is_empty(),
            self.profile.website.is_empty(),
            self.profile.linktree.is_empty(),
            self.profile.vertical.is_empty(),
            self.profile.specialization.is_empty(),
            self.profile.location.is_empty(),
        ];
        (
            field_completion.iter().filter(|&field| !field).count() as u8,
            field_completion.len() as u8,
        )
    }
}

pub async fn sync_deleted(pool: &PgPool, investors: &HashSet<String>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    let old_ids: HashSet<String> = sqlx::query!("SELECT id FROM investors")
        .fetch_all(&mut tx)
        .await?
        .into_iter()
        .map(|x| x.id)
        .collect();

    let for_deletion = old_ids.difference(investors).cloned().collect_vec();

    sqlx::query!(
        "DELETE FROM investors WHERE investors.id = ANY($1)",
        &for_deletion
    )
    .execute(&mut tx)
    .await?;

    Ok(tx.commit().await?)
}

pub async fn insert_many(pool: &PgPool, investors: Vec<Investor>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for investor in investors {
        sqlx::query!(
            r#"
            INSERT INTO investors (
                id,
                contact,
                permissions,
                verified,
                name,
                description,
                tagline,
                image,
                website,
                linktree,
                vertical,
                specialization,
                location
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13
            )
            ON CONFLICT (id) DO
            UPDATE SET
                contact = EXCLUDED.contact,
                permissions = EXCLUDED.permissions,
                verified = EXCLUDED.verified,
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                tagline = EXCLUDED.tagline,
                image = EXCLUDED.image,
                website = EXCLUDED.website,
                linktree = EXCLUDED.linktree,
                vertical = EXCLUDED.vertical,
                specialization = EXCLUDED.specialization,
                location = EXCLUDED.location;
            "#,
            investor.id,
            investor.horizon.contact,
            serde_json::to_value(investor.horizon.permissions)?,
            investor.horizon.verified,
            investor.profile.name,
            investor.profile.description,
            investor.profile.tagline,
            serde_json::to_value(investor.profile.image)?,
            investor.profile.website,
            serde_json::to_value(investor.profile.linktree)?,
            serde_json::to_value(investor.profile.vertical)?,
            investor.profile.specialization,
            investor.profile.location
        )
        .execute(&mut tx)
        .await?;
    }

    Ok(tx.commit().await?)
}

#[async_trait::async_trait]
impl FetchAll for Investor {
    type Horizon = HorizonInvestor;

    async fn get_ids(
        client: &JsonRpcClient,
        account_id: &AccountId,
    ) -> anyhow::Result<HashSet<AccountId>> {
        let result = view_function_call(
            client,
            QueryRequest::CallFunction {
                account_id: account_id.clone(),
                method_name: "get_investors".to_string(),
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
                method_name: "get_investor".to_string(),
                args: FunctionArgs::from(json!({ "account_id": id }).to_string().into_bytes()),
            },
        )
        .await?;

        Ok((id.clone(), serde_json::from_slice(&result)?))
    }
}
