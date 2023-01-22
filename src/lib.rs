use std::collections::HashSet;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, serde_json, sys, AccountId, BorshStorageKey, Gas, Timestamp};

use crate::utils::{option_u64_dec_format, u64_dec_format};
use near_sdk::json_types::U64;

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
    RequestContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
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

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityStatus {
    Active,
    Flagged,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityKind {
    Project,
    Organization,
    DAO,
}

/// Entity is something that is beyond a single person.
/// Something that has a start and potentially an end.
/// Note, that all the basic information like name, description and social information is stored in the `socialdb`.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
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
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, PartialOrd, Hash,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Permission {
    Admin,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionDetail {
    description: String,
    #[serde(with = "u64_dec_format")]
    start_date: Timestamp,
    #[serde(with = "option_u64_dec_format")]
    end_date: Option<Timestamp>,
}

/// Relation between entity and contributor. Managed by source account.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Contribution {
    permissions: HashSet<Permission>,
    current: ContributionDetail,
    /// If more than one contribution was made, previous ones are in history.
    history: Vec<ContributionDetail>,
}

/// Request to contribute.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionRequest {
    description: String,
}

#[derive(BorshSerialize, BorshDeserialize)]
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

#[derive(BorshSerialize, BorshDeserialize)]
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

#[derive(BorshSerialize, BorshDeserialize)]
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
#[derive(BorshSerialize, BorshDeserialize)]
pub struct Contract {
    moderator_id: AccountId,
    entities: UnorderedMap<AccountId, VersionedEntity>,
    contributions: LookupMap<(AccountId, AccountId), VersionedContribution>,
    requests: LookupMap<(AccountId, AccountId), VersionedContributionRequest>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(moderator_id: AccountId) -> Self {
        Self {
            moderator_id,
            entities: UnorderedMap::new(StorageKeys::Entities),
            contributions: LookupMap::new(StorageKeys::Contributions),
            requests: LookupMap::new(StorageKeys::Requests),
        }
    }

    pub fn set_moderator(&mut self, moderator_id: AccountId) {
        self.assert_moderator();
        self.moderator_id = moderator_id;
    }

    /// Add new entity and given user as founding contributor.
    pub fn add_entity(&mut self, account_id: AccountId, kind: EntityKind, start_date: U64) {
        self.entities.insert(
            &account_id,
            &VersionedEntity::Current(Entity {
                status: EntityStatus::Active,
                kind,
                start_date: start_date.into(),
                end_date: None,
            }),
        );
        self.contributions.insert(
            &(account_id, env::predecessor_account_id()),
            &VersionedContribution::Current(Contribution {
                permissions: HashSet::from([Permission::Admin]),
                current: ContributionDetail {
                    description: "".to_string(),
                    start_date: start_date.into(),
                    end_date: None,
                },
                history: vec![],
            }),
        );
    }

    /// User requests to contribute to given entity.
    pub fn request_contribution(&mut self, entity_id: AccountId, description: String) {
        let key = (entity_id.clone(), env::predecessor_account_id());
        assert!(
            description.len() < MAX_DESCRIPTION_LENGTH,
            "ERR_DESCRIPTION_TOO_LONG"
        );
        self.requests.insert(
            &key,
            &VersionedContributionRequest::Current(ContributionRequest {
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

    pub fn approve_contribution(
        &mut self,
        entity_id: AccountId,
        contributor_id: AccountId,
        description: Option<String>,
        start_date: Option<U64>,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let key = (entity_id, contributor_id);
        let request = self.requests.get(&key).expect("ERR_NO_REQUEST");
        let description = description.unwrap_or(request.unwrap().description);
        let start_date = start_date.unwrap_or(env::block_timestamp().into());
        let contribution_detail = ContributionDetail {
            description,
            start_date: start_date.into(),
            end_date: None,
        };
        let contribution = if let Some(mut c) = self.contributions.get(&key).map(|c| c.unwrap()) {
            c.history.push(c.current);
            c.current = contribution_detail;
            c
        } else {
            Contribution {
                permissions: HashSet::new(),
                current: contribution_detail,
                history: vec![],
            }
        };
        self.contributions
            .insert(&key, &VersionedContribution::Current(contribution));
    }

    pub fn finish_contribution(
        &mut self,
        entity_id: AccountId,
        contributor_id: AccountId,
        end_date: U64,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        let key = (entity_id, contributor_id);
        let mut contributor = self
            .contributions
            .get(&key)
            .expect("ERR_NO_CONTRIBUTION")
            .unwrap();
        contributor.current.end_date = Some(end_date.into());
        self.contributions
            .insert(&key, &VersionedContribution::Current(contributor));
    }

    pub fn set_entity(&mut self, account_id: AccountId, entity: Entity) {
        self.assert_moderator();
        self.entities
            .insert(&account_id, &VersionedEntity::Current(entity));
    }

    fn assert_moderator(&self) {
        // Errors::OnlyModerator.into()
        assert_eq!(
            self.moderator_id,
            env::predecessor_account_id(),
            "{}",
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
            .unwrap();
        assert!(
            contribution.permissions.contains(&Permission::Admin),
            "ERR_NO_PERMISSION"
        );
    }

    /// Views

    pub fn get_entities(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<(AccountId, Entity)> {
        let from_index = from_index.unwrap_or(0);
        let limit = limit.unwrap_or(self.entities.len());
        let keys = self.entities.keys_as_vector();
        (from_index..std::cmp::min(from_index + limit, self.entities.len()))
            .map(|index| {
                let key = keys.get(index).unwrap();
                let value = self.entities.get(&key).unwrap().unwrap();
                (key, value)
            })
            .collect()
    }

    pub fn get_entity(&self, account_id: AccountId) -> Entity {
        // Errors::NoEntity.into()
        self.entities
            .get(&account_id)
            .expect("ERR_NO_ENTITY")
            .unwrap()
    }

    pub fn get_contribution(
        &self,
        entity_id: AccountId,
        contributor_id: AccountId,
    ) -> Option<Contribution> {
        self.contributions
            .get(&(entity_id, contributor_id))
            .map(|c| c.unwrap())
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
