use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::store::{TreeMap, UnorderedMap};
use near_sdk::{near_bindgen, require, AccountId, BorshStorageKey, PanicOnDefault};
use near_sdk_contract_tools::owner::OwnerExternal;
use near_sdk_contract_tools::Upgrade;
use near_sdk_contract_tools::{owner::Owner, Owner};

use crate::contribution::{
    VersionedContribution, VersionedContributionNeed, VersionedContributionRequest,
};
use crate::investor::VersionedInvestor;
use crate::project::VersionedProject;
use crate::vendor::VersionedVendor;

mod contribution;
mod dec_serde;
mod events;
mod investor;
mod project;
mod vendor;

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKeys {
    Projects,
    Vendors,
    Investors,
    Requests,
    Proposals,
    Contributions,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault, Owner, Upgrade)]
#[upgrade(hook = "owner")]
pub struct Contract {
    projects: TreeMap<AccountId, VersionedProject>,
    vendors: TreeMap<AccountId, VersionedVendor>,
    investors: TreeMap<AccountId, VersionedInvestor>,
    requests: UnorderedMap<(AccountId, String), VersionedContributionNeed>,
    proposals: UnorderedMap<(AccountId, AccountId), VersionedContributionRequest>,
    contributions: UnorderedMap<(AccountId, AccountId), VersionedContribution>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        let mut this = Self {
            projects: TreeMap::new(StorageKeys::Projects),
            vendors: TreeMap::new(StorageKeys::Vendors),
            investors: TreeMap::new(StorageKeys::Investors),
            requests: UnorderedMap::new(StorageKeys::Requests),
            proposals: UnorderedMap::new(StorageKeys::Proposals),
            contributions: UnorderedMap::new(StorageKeys::Contributions),
        };
        Owner::init(&mut this, &owner_id);
        this
    }

    /// Assertions.

    /// Checks if given account has permissions of a admin or higher for given entity.
    fn assert_admin(&self, entity_id: &AccountId, account_id: &AccountId) {
        require!(
            self.check_is_project_admin(entity_id, account_id),
            "ERR_NO_PERMISSION"
        );
    }

    /// Checks if given account is registered as a contributor.
    #[allow(dead_code)]
    fn assert_is_registered(&self, account_id: &AccountId) {
        require!(self.vendors.contains_key(account_id), "ERR_NOT_REGISTERED");
    }

    /// Views

    /// Check if given account ID is moderator.
    pub fn check_is_owner(&self, account_id: &AccountId) -> bool {
        self.own_get_owner() == Some(account_id.clone())
    }
}
