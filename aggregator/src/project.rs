use std::collections::{HashMap, HashSet};

use horizon::project::Project as HorizonProject;
use itertools::Itertools;
use near_account_id::AccountId;
use near_jsonrpc_client::JsonRpcClient;
use near_primitives::{types::FunctionArgs, views::QueryRequest};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

use crate::{empty_args, view_function_call, Completion, FetchAll, Image};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Social {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub image: Image,
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
    pub horizon: HorizonProject,
    #[serde(default)]
    pub profile: Social,
}

impl Completion for Project {
    fn completion(&self) -> (u8, u8) {
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
            self.profile.image.is_empty(),
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
}

pub async fn sync_deleted(pool: &PgPool, projects: &HashSet<String>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    let old_ids: HashSet<String> = sqlx::query!("SELECT id FROM projects")
        .fetch_all(&mut tx)
        .await?
        .into_iter()
        .map(|x| x.id)
        .collect();

    let for_deletion = old_ids.difference(projects).cloned().collect_vec();

    sqlx::query!(
        "DELETE FROM projects WHERE projects.id = ANY($1)",
        &for_deletion
    )
    .execute(&mut tx)
    .await?;

    Ok(tx.commit().await?)
}

pub async fn insert_many(pool: &PgPool, projects: Vec<Project>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for project in projects {
        sqlx::query!(
            "INSERT INTO projects (
                    id,
                    founders,
                    team,
                    why,
                    integration,
                    success_position,
                    problem,
                    vision,
                    deck,
                    white_paper,
                    roadmap,
                    team_deck,
                    demo,
                    tam,
                    geo,
                    verified,
                    application,
                    name,
                    description,
                    image,
                    website,
                    tagline,
                    linktree,
                    vertical,
                    stage,
                    userbase,
                    credits
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15, $16, $17, $18,
                    $19, $20, $21, $22, $23, $24, $25, $26, $27
                ) ON CONFLICT (id) DO
                UPDATE SET
                    founders = EXCLUDED.founders,
                    team = EXCLUDED.team,
                    why = EXCLUDED.why,
                    integration = EXCLUDED.integration,
                    success_position = EXCLUDED.success_position,
                    problem = EXCLUDED.problem,
                    vision = EXCLUDED.vision,
                    deck = EXCLUDED.deck,
                    white_paper = EXCLUDED.white_paper,
                    roadmap = EXCLUDED.roadmap,
                    team_deck = EXCLUDED.team_deck,
                    demo = EXCLUDED.demo,
                    tam = EXCLUDED.tam,
                    geo = EXCLUDED.geo,
                    verified = EXCLUDED.verified,
                    application = EXCLUDED.application,
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    image = EXCLUDED.image,
                    website = EXCLUDED.website,
                    tagline = EXCLUDED.tagline,
                    linktree = EXCLUDED.linktree,
                    vertical = EXCLUDED.vertical,
                    stage = EXCLUDED.stage,
                    userbase = EXCLUDED.userbase,
                    credits = EXCLUDED.credits;
                ",
            project.id,
            &project
                .horizon
                .founders
                .iter()
                .map(|id| id.to_string())
                .collect_vec(),
            serde_json::to_value(project.horizon.team)?,
            project.horizon.why,
            project.horizon.integration,
            project.horizon.success_position,
            project.horizon.problem,
            project.horizon.vision,
            project.horizon.deck,
            project.horizon.white_paper,
            project.horizon.roadmap,
            project.horizon.team_deck,
            project.horizon.demo,
            project.horizon.tam,
            project.horizon.geo,
            project.horizon.verified,
            serde_json::to_string(&project.horizon.application)?,
            project.profile.name,
            project.profile.description,
            serde_json::to_value(project.profile.image)?,
            project.profile.website,
            project.profile.tagline,
            serde_json::to_value(project.profile.linktree)?,
            serde_json::to_value(project.profile.vertical)?,
            project.profile.stage,
            project.profile.userbase.parse::<i32>().unwrap_or(0),
            project.horizon.credits,
        )
        .execute(&mut tx)
        .await
        .expect("Failed to insert project");
    }

    Ok(tx.commit().await?)
}

#[async_trait::async_trait]
impl FetchAll for Project {
    type Horizon = HorizonProject;

    async fn get_ids(
        client: &JsonRpcClient,
        horizon_account: &AccountId,
    ) -> anyhow::Result<HashSet<AccountId>> {
        let result = view_function_call(
            client,
            QueryRequest::CallFunction {
                account_id: horizon_account.clone(),
                method_name: "get_projects".to_string(),
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
                method_name: "get_project".to_string(),
                args: FunctionArgs::from(json!({ "account_id": id }).to_string().into_bytes()),
            },
        )
        .await?;

        Ok((id.clone(), serde_json::from_slice(&result)?))
    }
}
