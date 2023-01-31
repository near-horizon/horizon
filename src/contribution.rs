use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, require, AccountId, Timestamp};
use std::collections::{HashMap, HashSet};

use crate::contributor::VersionedContributor;
use crate::entity::Permission;
use crate::events::Events;
use crate::utils::{option_u64_dec_format, u64_dec_format};
use crate::{Contract, ContractExt, MAX_DESCRIPTION_LENGTH};

/// The story/description of a contribution to an entity.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionDetail {
    pub description: String,
    #[serde(with = "u64_dec_format")]
    pub start_date: Timestamp,
    #[serde(with = "option_u64_dec_format")]
    pub end_date: Option<Timestamp>,
}

/// Relation between entity and contributor. Managed by source account.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Contribution {
    // TODO: Do we want to store this in a UnorderedSet for lazy loading?
    pub permissions: HashSet<Permission>,
    pub current: ContributionDetail,
    /// If more than one contribution was made, previous ones are in history.
    // TODO: Do we want to keep this stored in a Vector for lazy reading?
    pub history: Vec<ContributionDetail>,
}

/// Request to contribute.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionRequest {
    pub description: String,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContribution {
    Current(Contribution),
}

impl VersionedContribution {
    pub fn unwrap(self) -> Contribution {
        match self {
            VersionedContribution::Current(c) => c,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContributionRequest {
    Current(ContributionRequest),
}

impl VersionedContributionRequest {
    pub fn unwrap(self) -> ContributionRequest {
        match self {
            VersionedContributionRequest::Current(cr) => cr,
        }
    }
}

#[near_bindgen]
impl Contract {
    /// User requests to contribute to a given entity.
    pub fn request_contribution(&mut self, entity_id: AccountId, description: String) {
        let key = (entity_id.clone(), env::predecessor_account_id());
        require!(
            description.len() < MAX_DESCRIPTION_LENGTH,
            "ERR_DESCRIPTION_TOO_LONG"
        );
        self.contributors
            .entry(env::predecessor_account_id())
            .or_insert(VersionedContributor::Current(Default::default()));
        // TODO: Check if this account already has a contribution request for this entity? Do we
        // just overwrite or keep track of multiple requests.
        self.requests.insert(
            key,
            VersionedContributionRequest::Current(ContributionRequest {
                description: description.clone(),
            }),
        );
        Events::RequestContribution {
            entity_id,
            contributor_id: env::predecessor_account_id(),
            description,
        }
        .emit();
    }

    /// Entity manager (or higher) approves a contribution request.
    pub fn approve_contribution(
        &mut self,
        entity_id: AccountId,
        contributor_id: AccountId,
        description: Option<String>,
        start_date: Option<U64>,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let key = (entity_id.clone(), contributor_id.clone());
        let request = self.requests.get(&key).expect("ERR_NO_REQUEST");
        let description = description.unwrap_or(request.clone().unwrap().description);
        let start_date: Timestamp = start_date.unwrap_or(env::block_timestamp().into()).into();
        let contribution_detail = ContributionDetail {
            description: description.clone(),
            start_date: start_date.clone(),
            end_date: None,
        };
        let contribution = if let Some(mut old_contribution) = self
            .contributions
            .get(&key)
            .map(|existing_contribution| existing_contribution.clone().unwrap())
        {
            old_contribution.history.push(old_contribution.current);
            old_contribution.current = contribution_detail;
            old_contribution
        } else {
            Contribution {
                permissions: HashSet::new(),
                current: contribution_detail,
                history: vec![],
            }
        };
        self.contributors
            .entry(contributor_id.clone())
            .or_insert(VersionedContributor::Current(Default::default()));
        self.contributions
            .insert(key, VersionedContribution::Current(contribution));
        Events::ApproveContribution {
            entity_id,
            contributor_id,
            description,
            start_date,
        }
        .emit();
    }

    /// Entity manager (or higher) marks the contribution as finished/completed.
    pub fn finish_contribution(
        &mut self,
        entity_id: AccountId,
        contributor_id: AccountId,
        end_date: U64,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let key = (entity_id.clone(), contributor_id.clone());
        let mut contributor = self
            .contributions
            .get(&key)
            .expect("ERR_NO_CONTRIBUTION")
            .clone()
            .unwrap();
        let end_date: Timestamp = end_date.into();
        contributor.current.end_date = Some(end_date);
        self.contributions
            .insert(key, VersionedContribution::Current(contributor));
        Events::FinishContribution {
            entity_id,
            contributor_id,
            end_date,
        }
        .emit();
    }

    /// Views

    /// Get all the contributions for a single contributor.
    pub fn get_contributor_contributions(
        &self,
        account_id: AccountId,
    ) -> HashMap<AccountId, Contribution> {
        self.contributions
            .into_iter()
            .filter_map(|((entity, contributor), contribution)| {
                (&account_id == contributor)
                    .then_some((entity.clone(), contribution.clone().unwrap()))
            })
            .collect()
    }

    /// Get all the entity account IDs where contributor has Admin permissions.
    pub fn get_contributor_admin_entities(&self, account_id: AccountId) -> HashSet<AccountId> {
        self.contributions
            .into_iter()
            .filter_map(|((entity, contributor), contribution)| {
                (&account_id == contributor
                    && contribution
                        .clone()
                        .unwrap()
                        .permissions
                        .contains(&Permission::Admin))
                .then_some(entity.clone())
            })
            .collect()
    }

    /// Get contribution details.
    pub fn get_contribution(
        &self,
        entity_id: AccountId,
        contributor_id: AccountId,
    ) -> Option<Contribution> {
        self.contributions
            .get(&(entity_id, contributor_id))
            .map(|contribution| contribution.clone().unwrap())
    }

    /// Get all the contributions for this entity.
    pub fn get_entity_contributions(&self, entity_id: AccountId) -> Vec<(AccountId, Contribution)> {
        self.contributions
            .into_iter()
            .filter_map(|((key_entity_id, account_id), versioned_contribution)| {
                (key_entity_id == &entity_id)
                    .then_some((account_id.clone(), versioned_contribution.clone().unwrap()))
            })
            .collect()
    }

    /// Get contribution request details.
    pub fn get_contribution_request(
        &self,
        entity_id: AccountId,
        contributor_id: AccountId,
    ) -> Option<ContributionRequest> {
        self.requests
            .get(&(entity_id, contributor_id))
            .map(|contribution_request| contribution_request.clone().unwrap())
    }

    /// Get all the requests for this entity.
    pub fn get_entity_contribution_requests(
        &self,
        entity_id: AccountId,
    ) -> Vec<(AccountId, ContributionRequest)> {
        self.requests
            .into_iter()
            .filter_map(|((key_entity_id, account_id), versioned_contribution)| {
                (key_entity_id == &entity_id)
                    .then_some((account_id.clone(), versioned_contribution.clone().unwrap()))
            })
            .collect()
    }
}
