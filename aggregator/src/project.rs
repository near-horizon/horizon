use std::{
    collections::{HashMap, HashSet},
    error::Error,
};

use futures::StreamExt;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
// use sqlx::PgPool;

use crate::{empty_args, view_function_call, Permissions};

#[derive(Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default)]
pub enum ApplicationStatus {
    #[default]
    NotSubmitted,
    Submitted(#[serde(with = "crate::u64_dec_format")] u64),
    Rejected(String),
    Accepted,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Horizon {
    pub founders: HashSet<AccountId>,
    pub team: Permissions,
    pub why: String,
    pub integration: String,
    pub success_position: String,
    pub problem: String,
    pub vision: String,
    pub deck: String,
    pub white_paper: String,
    pub roadmap: String,
    pub team_deck: String,
    pub demo: String,
    pub tam: String,
    pub geo: String,
    pub verified: bool,
    pub application: ApplicationStatus,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Social {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub logo: String,
    #[serde(default)]
    pub website: String,
    #[serde(default)]
    pub tagline: String,
    #[serde(default)]
    pub linktree: HashMap<String, String>,
    #[serde(default)]
    pub vertical: HashMap<String, String>,
    #[serde(default)]
    pub category: String,
    #[serde(default)]
    pub stage: String,
    #[serde(default)]
    pub userbase: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Project {
    #[serde(default)]
    pub id: String,
    pub horizon: Horizon,
    #[serde(default)]
    pub profile: Social,
}

impl Project {
    pub fn completion(&self) -> (u8, u8) {
        let field_completion = [
            self.horizon.founders.is_empty(),
            self.horizon.team.is_empty(),
            self.horizon.why.is_empty(),
            self.horizon.integration.is_empty(),
            self.horizon.success_position.is_empty(),
            self.horizon.problem.is_empty(),
            self.horizon.vision.is_empty(),
            self.horizon.deck.is_empty(),
            self.horizon.white_paper.is_empty(),
            self.horizon.roadmap.is_empty(),
            self.horizon.team_deck.is_empty(),
            self.horizon.demo.is_empty(),
            self.horizon.tam.is_empty(),
            self.horizon.geo.is_empty(),
            self.profile.name.is_empty(),
            self.profile.description.is_empty(),
            self.profile.logo.is_empty(),
            self.profile.website.is_empty(),
            self.profile.tagline.is_empty(),
            self.profile.linktree.is_empty(),
            self.profile.vertical.is_empty(),
            self.profile.category.is_empty(),
            self.profile.stage.is_empty(),
            self.profile.userbase.is_empty(),
        ];
        (
            field_completion.iter().filter(|&x| !x).count() as u8,
            field_completion.len() as u8,
        )
    }

    // pub async fn insert_many(pool: &PgPool, projects: Vec<Self>) -> Result<(), sqlx::Error> {
    //     let mut tx = pool.begin().await?;
    //
    //     for project in projects {
    //         sqlx::query!(
    //             "INSERT INTO projects (
    //                 id,
    //                 founders,
    //                 team,
    //                 why,
    //                 integration,
    //                 success_position,
    //                 problem,
    //                 vision,
    //                 deck,
    //                 white_paper,
    //                 roadmap,
    //                 team_deck,
    //                 demo,
    //                 tam,
    //                 geo,
    //                 verified,
    //                 application,
    //                 name,
    //                 description,
    //                 logo,
    //                 website,
    //                 tagline,
    //                 linktree,
    //                 vertical,
    //                 category,
    //                 stage,
    //                 userbase,
    //             ) VALUES (
    //                 $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    //                 $11, $12, $13, $14, $15, $16, $17, $18,
    //                 $19, $20, $21, $22, $23, $24, $25, $26
    //             ) ON CONFLICT (id) DO
    //             UPDATE SET
    //                 founders = EXCLUDED.founders,
    //                 team = EXCLUDED.team,
    //                 why = EXCLUDED.why,
    //                 integration = EXCLUDED.integration,
    //                 success_position = EXCLUDED.success_position,
    //                 problem = EXCLUDED.problem,
    //                 vision = EXCLUDED.vision,
    //                 deck = EXCLUDED.deck,
    //                 white_paper = EXCLUDED.white_paper,
    //                 roadmap = EXCLUDED.roadmap,
    //                 team_deck = EXCLUDED.team_deck,
    //                 demo = EXCLUDED.demo,
    //                 tam = EXCLUDED.tam,
    //                 geo = EXCLUDED.geo,
    //                 verified = EXCLUDED.verified,
    //                 application = EXCLUDED.application,
    //                 name = EXCLUDED.name,
    //                 description = EXCLUDED.description,
    //                 logo = EXCLUDED.logo,
    //                 website = EXCLUDED.website,
    //                 tagline = EXCLUDED.tagline,
    //                 linktree = EXCLUDED.linktree,
    //                 vertical = EXCLUDED.vertical,
    //                 category = EXCLUDED.category,
    //                 stage = EXCLUDED.stage,
    //                 userbase = EXCLUDED.userbase;
    //             ",
    //             project.id,
    //             project.horizon.founders,
    //             project.horizon.team,
    //             project.horizon.why,
    //             project.horizon.integration,
    //             project.horizon.success_position,
    //             project.horizon.problem,
    //             project.horizon.vision,
    //             project.horizon.deck,
    //             project.horizon.white_paper,
    //             project.horizon.roadmap,
    //             project.horizon.team_deck,
    //             project.horizon.demo,
    //             project.horizon.tam,
    //             project.horizon.geo,
    //             project.horizon.verified,
    //             project.horizon.application,
    //             project.profile.name,
    //             project.profile.description,
    //             project.profile.logo,
    //             project.profile.website,
    //             project.profile.tagline,
    //             project.profile.linktree,
    //             project.profile.vertical,
    //             project.profile.category,
    //             project.profile.stage,
    //             project.profile.userbase,
    //         )
    //         .execute(&mut tx)
    //         .await
    //         .expect("Failed to insert project");
    //     }
    //
    //     tx.commit().await?;
    //     Ok(())
    // }
}

pub async fn get_project_ids(
    client: &JsonRpcClient,
    account_id: &AccountId,
) -> Result<HashSet<AccountId>, Box<dyn Error>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: account_id.clone(),
            method_name: "get_projects".to_string(),
            args: empty_args(),
        },
    )
    .await?;

    Ok(serde_json::from_slice(&result)?)
}

async fn get_horizon_project_details(
    project_id: &AccountId,
    client: &JsonRpcClient,
    horizon_account: &AccountId,
) -> Result<(AccountId, Horizon), Box<dyn std::error::Error>> {
    let result = view_function_call(
        client,
        QueryRequest::CallFunction {
            account_id: horizon_account.clone(),
            method_name: "get_project".to_string(),
            args: FunctionArgs::from(json!({ "account_id": project_id }).to_string().into_bytes()),
        },
    )
    .await?;

    Ok((project_id.clone(), serde_json::from_slice(&result)?))
}

async fn get_horizon_projects_batch(
    client: &JsonRpcClient,
    accounts: &[AccountId],
    horizon_account: &AccountId,
    profiles_batch: HashMap<AccountId, Value>,
) -> Result<HashMap<AccountId, Value>, Box<dyn Error>> {
    futures::stream::iter(accounts.iter().map(|project_id| async {
            get_horizon_project_details(project_id, client, horizon_account).await
        }))
        .buffer_unordered(10)
        .collect::<Vec<Result<_, _>>>()
        .await
        .into_iter()
        .try_fold(profiles_batch, |mut acc, result| {
            let (project_id, details) = result?;
            acc.entry(project_id)
                .and_modify(|profile| {
                    profile.as_object_mut().unwrap().insert(
                        "horizon".to_string(),
                        serde_json::to_value(details.clone()).unwrap(),
                    );
                })
                .or_insert_with(|| {
                    let mut profile = serde_json::Map::new();
                    profile.insert(
                        "horizon".to_string(),
                        serde_json::to_value(details).unwrap(),
                    );
                    profile.into()
                });
            Ok::<HashMap<AccountId, Value>, Box<dyn std::error::Error>>(acc)
        })
}

pub async fn get_projects_data(
    client: &JsonRpcClient,
    horizon_account: AccountId,
    social_account: AccountId,
    project_ids: &HashSet<AccountId>,
) -> Result<HashMap<AccountId, Project>, Box<dyn Error>> {
    let mut projects_profiles = HashMap::new();

    for project_batch in &project_ids.iter().chunks(10) {
        let (keys, accounts): (Vec<String>, Vec<AccountId>) = project_batch
            .map(|project_id| (format!("{project_id}/profile/**"), project_id.clone()))
            .unzip();

        let keys = json!({ "keys": keys }).to_string().into_bytes();

        let result = view_function_call(
            client,
            QueryRequest::CallFunction {
                account_id: social_account.clone(),
                method_name: "get".to_string(),
                args: FunctionArgs::from(keys),
            },
        )
        .await?;

        let details_batch = get_horizon_projects_batch(
            client,
            &accounts,
            &horizon_account,
            serde_json::from_slice(&result)?,
        )
        .await?;

        projects_profiles.extend(details_batch);
    }

    Ok(projects_profiles
        .into_iter()
        .map(|(k, v)| (k, serde_json::from_value(v).unwrap()))
        .collect())
}
