use cid::multihash::{Code, MultihashDigest};
use cid::Cid;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, require, serde_json, AccountId, Timestamp};
use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;

use crate::contributor::{ContributionType, VersionedContributor};
use crate::entity::Permission;
use crate::events::Events;
use crate::utils::{option_u64_dec_format, u64_dec_format};
use crate::{Contract, ContractExt, MAX_DESCRIPTION_LENGTH};

/// The story/description of a contribution to an entity.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionDetail {
    pub description: String,
    pub contribution_type: ContributionType,
    pub need: Option<String>,
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
    pub contribution_type: ContributionType,
    pub need: Option<String>,
}

/// A need that a entity may have.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionNeed {
    pub description: String,
    pub contribution_type: ContributionType,
    pub active: bool,
}

/// A invite to contribute to a entity.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionInvite {
    pub description: String,
    pub contribution_type: ContributionType,
    pub permissions: HashSet<Permission>,
    #[serde(with = "u64_dec_format")]
    pub start_date: Timestamp,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContribution {
    Current(Contribution),
}

impl From<VersionedContribution> for Contribution {
    fn from(value: VersionedContribution) -> Self {
        match value {
            VersionedContribution::Current(c) => c,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContributionRequest {
    Current(ContributionRequest),
}

impl From<VersionedContributionRequest> for ContributionRequest {
    fn from(value: VersionedContributionRequest) -> Self {
        match value {
            VersionedContributionRequest::Current(c) => c,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContributionNeed {
    Current(ContributionNeed),
}

impl From<VersionedContributionNeed> for ContributionNeed {
    fn from(value: VersionedContributionNeed) -> Self {
        match value {
            VersionedContributionNeed::Current(c) => c,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContributionInvite {
    Current(ContributionInvite),
}

impl From<VersionedContributionInvite> for ContributionInvite {
    fn from(value: VersionedContributionInvite) -> Self {
        match value {
            VersionedContributionInvite::Current(c) => c,
        }
    }
}

const RAW: u64 = 0x55;

pub fn create_cid(value: &str) -> String {
    let hash = Code::Sha2_256.digest(value.to_string().as_bytes());
    let cid = Cid::new_v1(RAW, hash);
    cid.to_string()
}

#[near_bindgen]
impl Contract {
    /// Create a contribution need.
    pub fn post_contribution_need(
        &mut self,
        entity_id: AccountId,
        description: String,
        contribution_type: ContributionType,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let need = ContributionNeed {
            description: description.clone(),
            contribution_type: contribution_type.clone(),
            active: true,
        };
        let cid = create_cid(&serde_json::to_string(&need).unwrap());
        self.needs.insert(
            (entity_id.clone(), cid.clone()),
            VersionedContributionNeed::Current(need),
        );
        Events::PostContributionNeed {
            entity_id,
            cid,
            description,
            contribution_type,
        }
        .emit();
    }

    /// Update a contribution need.
    pub fn set_contribution_need(
        &mut self,
        entity_id: AccountId,
        cid: String,
        need: ContributionNeed,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        require!(
            self.needs.contains_key(&(entity_id.clone(), cid.clone())),
            "ERR_NO_CONTRIBUTION_NEED"
        );
        self.needs
            .insert((entity_id, cid), VersionedContributionNeed::Current(need));
    }

    /// User requests to contribute to a given entity.
    pub fn request_contribution(
        &mut self,
        entity_id: AccountId,
        description: String,
        contribution_type: ContributionType,
        need: Option<String>,
    ) {
        let key = (entity_id.clone(), env::predecessor_account_id());
        require!(
            description.len() < MAX_DESCRIPTION_LENGTH,
            "ERR_DESCRIPTION_TOO_LONG"
        );
        self.contributors
            .entry(env::predecessor_account_id())
            .or_insert(VersionedContributor::Current(Default::default()));
        let need = if let Some(cid) = need {
            require!(
                self.needs.contains_key(&(entity_id.clone(), cid.clone())),
                "ERR_NO_CONTRIBUTION_NEED"
            );
            Some(cid)
        } else {
            None
        };
        // TODO: Check if this account already has a contribution request for this entity? Do we
        // just overwrite or keep track of multiple requests.
        self.requests.insert(
            key,
            VersionedContributionRequest::Current(ContributionRequest {
                description: description.clone(),
                contribution_type: contribution_type.clone(),
                need,
            }),
        );
        Events::RequestContribution {
            entity_id,
            contributor_id: env::predecessor_account_id(),
            description,
            contribution_type,
        }
        .emit();
    }

    /// Entity manager (or higher) rejects a contribution request.
    pub fn reject_contribution(&mut self, entity_id: AccountId, contributor_id: AccountId) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let key = (entity_id.clone(), contributor_id.clone());
        self.requests.remove(&key);
        Events::RejectContribution {
            entity_id,
            contributor_id,
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
        let request =
            ContributionRequest::from(self.requests.get(&key).expect("ERR_NO_REQUEST").clone());
        let description = description.unwrap_or(request.description);
        let start_date: Timestamp = start_date.unwrap_or(env::block_timestamp().into()).into();
        let contribution_detail = ContributionDetail {
            description: description.clone(),
            start_date: start_date.clone(),
            contribution_type: request.contribution_type.clone(),
            need: request.need,
            end_date: None,
        };
        self.contributors
            .entry(contributor_id.clone())
            .or_insert(VersionedContributor::Current(Default::default()));
        self.contributions
            .entry(key.clone())
            .and_modify(|v_old| {
                let mut old = Contribution::from(v_old.clone());
                old.history.push(old.current);
                old.current = contribution_detail.clone();
                *v_old = VersionedContribution::Current(old);
            })
            .or_insert(VersionedContribution::Current(Contribution {
                permissions: HashSet::new(),
                current: contribution_detail,
                history: vec![],
            }));
        self.requests.remove(&key);
        Events::ApproveContribution {
            entity_id,
            contributor_id,
            description,
            contribution_type: request.contribution_type,
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
        let mut contributor: Contribution = self
            .contributions
            .get(&key)
            .expect("ERR_NO_CONTRIBUTION")
            .clone()
            .into();
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
                    .then_some((entity.clone(), contribution.clone().into()))
            })
            .collect()
    }

    /// Get all the entity account IDs where contributor has Admin permissions.
    pub fn get_contributor_admin_entities(&self, account_id: AccountId) -> HashSet<AccountId> {
        self.contributions
            .into_iter()
            .filter_map(|((entity, contributor), contribution)| {
                (&account_id == contributor
                    && Contribution::from(contribution.clone())
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
            .map(|contribution| contribution.clone().into())
    }

    /// Get all the contributions for this entity.
    pub fn get_entity_contributions(
        &self,
        account_id: AccountId,
    ) -> HashMap<AccountId, Contribution> {
        self.contributions
            .into_iter()
            .filter_map(|((entity_id, contributor_id), versioned_contribution)| {
                (entity_id == &account_id).then_some((
                    contributor_id.clone(),
                    versioned_contribution.clone().into(),
                ))
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
            .map(|contribution_request| contribution_request.clone().into())
    }

    /// Get all the requests this contributor sent.
    pub fn get_contributor_contribution_requests(
        &self,
        account_id: AccountId,
    ) -> Vec<(AccountId, ContributionRequest)> {
        self.requests
            .into_iter()
            .filter_map(|((entity_id, contributor_id), versioned_contribution)| {
                (contributor_id == &account_id)
                    .then_some((entity_id.clone(), versioned_contribution.clone().into()))
            })
            .collect()
    }

    /// Get all the requests for this entity.
    pub fn get_entity_contribution_requests(
        &self,
        account_id: AccountId,
    ) -> Vec<(AccountId, ContributionRequest)> {
        self.requests
            .into_iter()
            .filter_map(|((entity_id, contributor_id), versioned_contribution)| {
                (entity_id == &account_id).then_some((
                    contributor_id.clone(),
                    versioned_contribution.clone().into(),
                ))
            })
            .collect()
    }

    /// Get all contribution requests this account can manage.
    pub fn get_admin_contribution_requests(
        &self,
        account_id: AccountId,
    ) -> Vec<(AccountId, AccountId)> {
        self.requests
            .into_iter()
            .filter_map(|((entity_id, contributor_id), _)| {
                self.check_is_manager_or_higher(entity_id, &account_id)
                    .then_some((entity_id.clone(), contributor_id.clone()))
            })
            .collect()
    }

    /// Get contribution need details.
    pub fn get_contribution_need(
        &self,
        account_id: AccountId,
        cid: String,
    ) -> Option<ContributionNeed> {
        self.needs.get(&(account_id, cid)).map(|n| n.clone().into())
    }

    /// Get all contribution requests for a specific need.
    pub fn get_need_contribution_requests(
        &self,
        account_id: AccountId,
        cid: String,
    ) -> Vec<(AccountId, ContributionRequest)> {
        self.requests
            .into_iter()
            .filter_map(|((entity_id, contributor_id), r)| {
                (entity_id == &account_id
                    && ContributionRequest::from(r.clone()).need == Some(cid.clone()))
                .then_some((contributor_id.clone(), ContributionRequest::from(r.clone())))
            })
            .collect()
    }

    /// Get all contributions for a specific need.
    pub fn get_need_contributions(
        &self,
        account_id: AccountId,
        cid: String,
    ) -> HashMap<AccountId, Contribution> {
        self.contributions
            .into_iter()
            .filter_map(|((entity_id, contributor_id), c)| {
                if entity_id != &account_id {
                    return None;
                }
                let contribution = Contribution::from(c.clone());
                (contribution.current.need == Some(cid.clone())
                    || contribution
                        .history
                        .iter()
                        .any(|d| d.need == Some(cid.clone())))
                .then_some((contributor_id.clone(), contribution))
            })
            .collect()
    }

    /// Get all contribnution needs of entity.
    pub fn get_entity_contribution_needs(
        &self,
        account_id: AccountId,
    ) -> HashMap<String, ContributionNeed> {
        self.needs
            .into_iter()
            .filter_map(|((entity_id, cid), need)| {
                (entity_id == &account_id).then_some((cid.clone(), need.clone().into()))
            })
            .collect()
    }

    /// Get all contribnution needs this account can manage.
    pub fn get_admin_contribution_needs(&self, account_id: AccountId) -> Vec<(AccountId, String)> {
        self.needs
            .into_iter()
            .filter_map(|((entity_id, cid), _)| {
                self.check_is_manager_or_higher(&entity_id, &account_id)
                    .then_some((entity_id.clone(), cid.clone()))
            })
            .collect()
    }

    /// Get all contribnution needs.
    pub fn get_contribution_needs(&self) -> HashMap<AccountId, HashMap<String, ContributionNeed>> {
        self.needs
            .into_iter()
            .fold(HashMap::new(), |mut map, ((account_id, cid), need)| {
                map.entry(account_id.clone())
                    .and_modify(|inner| {
                        inner.insert(cid.clone(), need.clone().into());
                    })
                    .or_insert(HashMap::from_iter([(cid.clone(), need.clone().into())]));
                map
            })
    }

    /// Checks whether the contributor with the provided contributor ID already proposed to the
    /// need with the given entity ID and CID.
    pub fn check_if_need_proposed(
        &self,
        entity_id: AccountId,
        contributor_id: AccountId,
        cid: String,
    ) -> bool {
        self.requests.iter().any(|((e_id, c_id), c)| {
            e_id == &entity_id
                && c_id == &contributor_id
                && ContributionRequest::from(c.clone()).need == Some(cid.clone())
        })
    }
}
