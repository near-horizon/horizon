use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::store::UnorderedMap;
use near_sdk::{env, near_bindgen, require, sys, AccountId, BorshStorageKey, Gas, PanicOnDefault};

use crate::contribution::{Contribution, VersionedContribution, VersionedContributionRequest};
use crate::contributor::VersionedContributor;
use crate::entity::{Permission, VersionedEntity};

mod contribution;
mod contributor;
mod entity;
mod events;
mod utils;

const MAX_DESCRIPTION_LENGTH: usize = 420;

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKeys {
    Entities,
    Contributions,
    Requests,
    Contributors,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    moderator_id: AccountId,
    entities: UnorderedMap<AccountId, VersionedEntity>,
    contributions: UnorderedMap<(AccountId, AccountId), VersionedContribution>,
    requests: UnorderedMap<(AccountId, AccountId), VersionedContributionRequest>,
    contributors: UnorderedMap<AccountId, VersionedContributor>,
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
            contributors: UnorderedMap::new(StorageKeys::Contributors),
        }
    }

    pub fn set_moderator(&mut self, moderator_id: AccountId) {
        self.assert_moderator();
        self.moderator_id = moderator_id;
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
        let contribution = Contribution::from(
            self.contributions
                .get(&(entity_id.clone(), account_id.clone()))
                .expect("ERR_NO_CONTRIBUTION")
                .clone(),
        );
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
