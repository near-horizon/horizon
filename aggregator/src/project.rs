use std::{
    collections::{HashMap, HashSet},
    str::FromStr,
};

use horizon::{
    contribution::{Contribution, ContributionStatus},
    incentives::Incentive,
    project::Project as HorizonProject,
    XCC_GAS,
};
use itertools::Itertools;
use near_account_id::AccountId;
use near_crypto::{InMemorySigner, PublicKey, SecretKey, Signer};
use near_jsonrpc_client::{
    methods::broadcast_tx_commit::RpcBroadcastTxCommitRequest, JsonRpcClient,
};
use near_jsonrpc_primitives::types::query::{RpcQueryRequest, RpcQueryResponse};
use near_primitives::{
    hash::CryptoHash,
    transaction::{Action, FunctionCallAction, SignedTransaction},
    types::{BlockReference, Finality, FunctionArgs},
    views::QueryRequest,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

use crate::{empty_args, view_function_call, FetchAll, Image};

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
    pub verticals: HashMap<String, String>,
    #[serde(default)]
    pub category: String,
    #[serde(default)]
    pub stage: String,
    #[serde(default)]
    pub userbase: String,
    #[serde(default)]
    pub distribution: String,
    #[serde(default)]
    pub dev: String,
    #[serde(default)]
    pub product_type: HashMap<String, String>,
    #[serde(default)]
    pub team: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Project {
    #[serde(default)]
    pub id: String,
    pub horizon: HorizonProject,
    #[serde(default)]
    pub profile: Social,
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
    .await
    .map_err(|e| {
        eprintln!("Failed to delete projects: {:#?}", for_deletion);
        e
    })?;

    Ok(tx.commit().await?)
}

pub async fn insert_many(pool: &PgPool, projects: Vec<Project>) -> anyhow::Result<()> {
    let mut tx = pool.begin().await?;

    for project in projects {
        let vertical = if project.profile.verticals.is_empty() {
            HashMap::from_iter([(project.profile.category, "".to_string())])
        } else {
            project.profile.verticals
        };
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
                    credits,
                    distribution,
                    dev,
                    product_type,
                    company_size,
                    balance,
                    contracts
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15, $16, $17, $18,
                    $19, $20, $21, $22, $23, $24, $25, $26,
                    $27, $28, $29, $30, $31, $32, $33
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
                    credits = EXCLUDED.credits,
                    distribution = EXCLUDED.distribution,
                    dev = EXCLUDED.dev,
                    product_type = EXCLUDED.product_type,
                    company_size = EXCLUDED.company_size,
                    balance = EXCLUDED.balance,
                    contracts = EXCLUDED.contracts;
                ",
            project.id,
            &project
                .horizon
                .project
                .founders
                .iter()
                .map(|id| id.to_string())
                .collect_vec(),
            serde_json::to_value(project.horizon.project.team)?,
            project.horizon.project.why,
            project.horizon.project.integration,
            project.horizon.project.success_position,
            project.horizon.project.problem,
            project.horizon.project.vision,
            project.horizon.project.deck,
            project.horizon.project.white_paper,
            project.horizon.project.roadmap,
            project.horizon.project.team_deck,
            project.horizon.project.demo,
            project.horizon.project.tam,
            project.horizon.project.geo,
            project.horizon.project.verified,
            serde_json::to_string(&project.horizon.project.application)?,
            project.profile.name,
            project.profile.description,
            serde_json::to_value(project.profile.image)?,
            project.profile.website,
            project.profile.tagline,
            serde_json::to_value(project.profile.linktree)?,
            serde_json::to_value(vertical)?,
            project.profile.stage,
            project.profile.userbase.parse::<i32>().unwrap_or(0),
            project.horizon.project.credits,
            project.profile.distribution,
            project.profile.dev,
            &project.profile.product_type.keys().cloned().collect_vec(),
            project.profile.team.parse::<i32>().unwrap_or(0),
            project.horizon.credit_balance as i64,
            &project
                .horizon
                .contracts
                .iter()
                .map(|x| x.to_string())
                .collect_vec(),
        )
        .execute(&mut tx)
        .await
        .expect("Failed to insert project");
    }

    Ok(tx.commit().await?)
}

#[derive(Serialize, Deserialize, Clone)]
pub struct ProjectState {
    pub id: AccountId,
    pub contracts: Vec<Contribution>,
    pub team: u8,
    pub completion: f64,
}

pub async fn get_state(pool: &PgPool, ids: Vec<AccountId>) -> Vec<ProjectState> {
    sqlx::query!(
        r#"
        SELECT
          id,
          (
            SELECT
              COUNT(*)
            FROM
              jsonb_object_keys(team) AS v
          ),
          completion,
          contributions.vendor_id,
          contributions.cid,
          contributions.status
        FROM
          projects
          LEFT JOIN contributions ON projects.id = contributions.project_id
        WHERE
          id = ANY($1)
        "#,
        &ids.iter().map(|x| x.to_string()).collect_vec()
    )
    .fetch_all(pool)
    .await
    .expect("Failed to fetch projects")
    .into_iter()
    .fold(
        Vec::<ProjectState>::with_capacity(ids.len()),
        |mut v, record| {
            if let Some(existing) = v.iter_mut().find(|x| x.id.to_string() == record.id) {
                if let Some(cid) = record.cid {
                    existing.contracts.push(Contribution {
                        proposal_id: (
                            (record.id.parse().unwrap(), cid),
                            record.vendor_id.unwrap().parse().unwrap(),
                        ),
                        status: serde_json::from_value(record.status.unwrap()).unwrap(),
                        actions: vec![],
                        vendor_feedback: None,
                        project_feedback: None,
                        price: 0,
                    });
                }
            } else {
                v.push(ProjectState {
                    id: record.id.parse().unwrap(),
                    contracts: if let Some(cid) = record.cid {
                        vec![Contribution {
                            proposal_id: (
                                (record.id.parse().unwrap(), cid),
                                record.vendor_id.unwrap().parse().unwrap(),
                            ),
                            status: serde_json::from_value(record.status.unwrap()).unwrap(),
                            actions: vec![],
                            vendor_feedback: None,
                            project_feedback: None,
                            price: 0,
                        }]
                    } else {
                        vec![]
                    },
                    team: record.count.unwrap() as u8,
                    completion: record.completion,
                });
            }

            v
        },
    )
}

pub async fn get_nonce(
    client: &JsonRpcClient,
    account_id: &AccountId,
    public_key: &PublicKey,
) -> anyhow::Result<(u64, CryptoHash)> {
    let RpcQueryResponse {
        kind, block_hash, ..
    } = client
        .call(RpcQueryRequest {
            block_reference: BlockReference::Finality(Finality::Final),
            request: QueryRequest::ViewAccessKey {
                account_id: account_id.clone(),
                public_key: public_key.clone(),
            },
        })
        .await?;

    let nonce = match kind {
        near_jsonrpc_primitives::types::query::QueryResponseKind::AccessKey(key_view) => {
            key_view.nonce
        }
        _ => unreachable!(),
    };

    Ok((nonce, block_hash))
}

pub async fn award_incentives(
    client: &JsonRpcClient,
    account_id: AccountId,
    receiver_id: AccountId,
    secret_key: &str,
    incentives: Vec<(AccountId, Vec<Incentive>)>,
) {
    let signer = InMemorySigner::from_secret_key(
        account_id.clone(),
        SecretKey::from_str(secret_key).unwrap(),
    );

    let (nonce, hash) = get_nonce(client, &account_id, &signer.public_key())
        .await
        .unwrap();

    let txs = incentives
        .into_iter()
        .flat_map(|(account_id, incentinves)| {
            incentinves
                .into_iter()
                .map(|incentive| {
                    Action::FunctionCall(FunctionCallAction {
                        method_name: "add_incentive".to_string(),
                        args: serde_json::to_vec(&json!({
                            "account_id": account_id,
                            "incentive": incentive,
                        }))
                        .unwrap(),
                        gas: XCC_GAS.0,
                        deposit: 0,
                    })
                })
                .collect_vec()
        })
        .chunks(100)
        .into_iter()
        .map(|actions| RpcBroadcastTxCommitRequest {
            signed_transaction: SignedTransaction::from_actions(
                nonce + 1,
                account_id.clone(),
                receiver_id.clone(),
                &signer,
                actions.collect_vec(),
                hash,
            ),
        })
        .collect_vec();

    for tx in txs {
        client
            .call(tx)
            .await
            .expect("Failed to broadcast transaction");
    }
}

pub fn check_incentives(before: Option<&ProjectState>, after: &ProjectState) -> Vec<Incentive> {
    let mut incentives = vec![];

    let default = ProjectState {
        id: after.id.clone(),
        contracts: vec![],
        team: 0,
        completion: 0f64,
    };

    let before = before.unwrap_or(&default);

    if before.completion < 0.5f64 && after.completion >= 0.5f64 {
        incentives.push(Incentive::ProfileCompletionHalf);
    }

    if before.completion < 1f64 && after.completion >= 1f64 {
        incentives.push(Incentive::ProfileCompletion);
    }

    for _ in before.team..after.team {
        incentives.push(Incentive::AdditionOfTeamMember);
    }

    if before.contracts.is_empty() && !after.contracts.is_empty() {
        incentives.push(Incentive::FirstProposalAcceptance);
    }

    for _ in before
        .contracts
        .iter()
        .filter(|c| matches!(c.status, ContributionStatus::Completed(_)))
        .count()
        ..after
            .contracts
            .iter()
            .filter(|c| matches!(c.status, ContributionStatus::Completed(_)))
            .count()
    {
        incentives.push(Incentive::ContractCompletion);
    }

    incentives
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
