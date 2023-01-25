use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::store::UnorderedMap;
use near_sdk::{
    env, near_bindgen, require, serde_json, sys, AccountId, BorshStorageKey, Gas, PanicOnDefault,
    Timestamp,
};
use std::collections::{HashMap, HashSet};

use crate::utils::{option_u64_dec_format, u64_dec_format};

mod utils;

const MAX_DESCRIPTION_LENGTH: usize = 420;

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKeys {
    Entities,
    Contributions,
    Requests,
}

#[derive(Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
enum Events {
    AddEntity {
        entity_id: AccountId,
    },
    RequestContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
    },
    ApproveContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
    FinishContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        #[serde(with = "u64_dec_format")]
        end_date: Timestamp,
    },
}

impl Events {
    pub(crate) fn emit(self) {
        env::log_str(&format!(
            "EVENT_JSON:{}",
            &serde_json::to_string(&self).unwrap()
        ));
    }
}

/// An entity can be in different states because it can potentially have an end (through different
/// ways - legal issues, no funding...).
/// This is represented by the EntityStatus.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityStatus {
    Active,
    Flagged,
}

/// An entity can take different shapes, and currently we can categorize them in these types.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityKind {
    Project,
    Organization,
    DAO,
}

/// Entity is something that is beyond a single person.
/// Something that has a start and potentially an end.
/// Note, that all the basic information like name, description and social information is stored in the `socialdb`.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Entity {
    status: EntityStatus,
    kind: EntityKind,
    #[serde(with = "u64_dec_format")]
    start_date: Timestamp,
    #[serde(with = "option_u64_dec_format")]
    end_date: Option<Timestamp>,
}

/// Permissions table for interaction between a contributor and an entity.
#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, PartialOrd, Hash, Clone,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Permission {
    Admin,
}

/// The story/description of a contribution to an entity.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionDetail {
    description: String,
    #[serde(with = "u64_dec_format")]
    start_date: Timestamp,
    #[serde(with = "option_u64_dec_format")]
    end_date: Option<Timestamp>,
}

/// Relation between entity and contributor. Managed by source account.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Contribution {
    // TODO: Do we want to store this in a UnorderedSet for lazy loading?
    permissions: HashSet<Permission>,
    current: ContributionDetail,
    /// If more than one contribution was made, previous ones are in history.
    // TODO: Do we want to keep this stored in a Vector for lazy reading?
    history: Vec<ContributionDetail>,
}

/// Request to contribute.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionRequest {
    description: String,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedEntity {
    Current(Entity),
}

impl VersionedEntity {
    pub fn unwrap(self) -> Entity {
        match self {
            VersionedEntity::Current(e) => e,
        }
    }
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
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
pub struct Contract {
    moderator_id: AccountId,
    entities: UnorderedMap<AccountId, VersionedEntity>,
    contributions: UnorderedMap<(AccountId, AccountId), VersionedContribution>,
    requests: UnorderedMap<(AccountId, AccountId), VersionedContributionRequest>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(moderator_id: AccountId) -> Self {
        Self {
            moderator_id,
            entities: UnorderedMap::new(StorageKeys::Entities),
            contributions: UnorderedMap::new(StorageKeys::Contributions),
            requests: UnorderedMap::new(StorageKeys::Requests),
        }
    }

    pub fn set_moderator(&mut self, moderator_id: AccountId) {
        self.assert_moderator();
        self.moderator_id = moderator_id;
    }

    /// Add new entity and given user as founding contributor.
    pub fn add_entity(&mut self, account_id: AccountId, kind: EntityKind, start_date: U64) {
        self.entities.insert(
            account_id.clone(),
            VersionedEntity::Current(Entity {
                status: EntityStatus::Active,
                kind,
                start_date: start_date.into(),
                end_date: None,
            }),
        );
        self.contributions.insert(
            (account_id.clone(), env::predecessor_account_id()),
            VersionedContribution::Current(Contribution {
                permissions: HashSet::from([Permission::Admin]),
                current: ContributionDetail {
                    description: "".to_string(),
                    start_date: start_date.into(),
                    end_date: None,
                },
                history: vec![],
            }),
        );
        Events::AddEntity {
            entity_id: account_id,
        }
        .emit();
    }

    /// User requests to contribute to a given entity.
    pub fn request_contribution(&mut self, entity_id: AccountId, description: String) {
        let key = (entity_id.clone(), env::predecessor_account_id());
        require!(
            description.len() < MAX_DESCRIPTION_LENGTH,
            "ERR_DESCRIPTION_TOO_LONG"
        );
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

    /// Moderator updates the entity details.
    pub fn set_entity(&mut self, account_id: AccountId, entity: Entity) {
        self.assert_moderator();
        self.entities
            .insert(account_id, VersionedEntity::Current(entity));
    }

    /// Checks if transaction was performed by moderator account.
    fn assert_moderator(&self) {
        // Errors::OnlyModerator.into()
        require!(
            self.moderator_id == env::predecessor_account_id(),
            "ERR_ONLY_MODERATOR"
        );
    }

    /// Checks if given account has permissions of a manager or higher for given entity.
    fn assert_manager_or_higher(&self, entity_id: &AccountId, account_id: &AccountId) {
        if account_id == &self.moderator_id {
            return;
        }
        let contribution = self
            .contributions
            .get(&(entity_id.clone(), account_id.clone()))
            .expect("ERR_NO_CONTRIBUTION")
            .clone()
            .unwrap();
        require!(
            contribution.permissions.contains(&Permission::Admin),
            "ERR_NO_PERMISSION"
        );
    }

    /// Views

    /// Check if given account ID is moderator.
    pub fn check_is_moderator(&self, account_id: AccountId) -> bool {
        self.moderator_id == account_id
    }

    /// List out entities. By default list all of them.
    pub fn get_entities(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<(AccountId, Entity)> {
        let from_index = from_index.unwrap_or(0);
        let limit = limit.unwrap_or(self.entities.len().into());
        self.entities
            .into_iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .map(|(key, versioned_entity)| (key.clone(), versioned_entity.clone().unwrap()))
            .collect()
    }

    /// List single entity details.
    pub fn get_entity(&self, account_id: AccountId) -> Entity {
        self.entities
            .get(&account_id)
            .expect("ERR_NO_ENTITY")
            .clone()
            .unwrap()
    }

    /// Get all contributor account IDs.
    pub fn get_contributors(&self) -> HashSet<AccountId> {
        self.contributions
            .into_iter()
            .map(|((_, contributor), _)| contributor.clone())
            .collect()
    }

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

    /// Should only be called by this contract on migration.
    /// This is NOOP implementation. KEEP IT if you haven't changed contract state.
    /// This method is called from `upgrade()` method.
    /// For next version upgrades, change this function.
    #[init(ignore_state)]
    #[private]
    pub fn migrate() -> Self {
        let this: Contract = env::state_read().expect("Contract is not initialized.");
        this
    }
}

#[no_mangle]
pub fn upgrade() {
    env::setup_panic_hook();

    let contract: Contract = env::state_read().expect("Contract is not initialized");
    contract.assert_moderator();

    const MIGRATE_METHOD_NAME: &[u8; 7] = b"migrate";
    const UPGRADE_GAS_LEFTOVER: Gas = Gas(5_000_000_000_000);

    unsafe {
        // Load code into register 0 result from the input argument if factory call or from promise if callback.
        sys::input(0);
        // Create a promise batch to upgrade current contract with code from register 0.
        let promise_id = sys::promise_batch_create(
            env::current_account_id().as_bytes().len() as u64,
            env::current_account_id().as_bytes().as_ptr() as u64,
        );
        // Deploy the contract code from register 0.
        sys::promise_batch_action_deploy_contract(promise_id, u64::MAX, 0);
        // Call promise to migrate the state.
        // Batched together to fail upgrade if migration fails.
        sys::promise_batch_action_function_call(
            promise_id,
            MIGRATE_METHOD_NAME.len() as u64,
            MIGRATE_METHOD_NAME.as_ptr() as u64,
            0,
            0,
            0,
            (env::prepaid_gas() - env::used_gas() - UPGRADE_GAS_LEFTOVER).0,
        );
        sys::promise_return(promise_id);
    }
}
