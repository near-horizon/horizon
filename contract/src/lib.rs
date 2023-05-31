use cid::multihash::{Code, MultihashDigest};
use cid::Cid;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::store::{TreeMap, UnorderedMap};
use near_sdk::{
    near_bindgen, require, AccountId, BorshStorageKey, CryptoHash, Gas, PanicOnDefault,
};
use near_sdk_contract_tools::owner::OwnerExternal;
use near_sdk_contract_tools::Upgrade;
use near_sdk_contract_tools::{owner::Owner, Owner};

use crate::claim::VersionedClaim;
use crate::contribution::VersionedContribution;
use crate::investor::VersionedInvestor;
use crate::project::VersionedProject;
use crate::proposal::VersionedProposal;
use crate::request::VersionedRequest;
use crate::vendor::VersionedVendor;

pub mod claim;
pub mod contribution;
pub mod dec_serde;
pub mod events;
pub mod investor;
pub mod project;
pub mod proposal;
pub mod request;
pub mod vendor;

const RAW: u64 = 0x55;
pub const TGAS: u64 = 1_000_000_000_000;
pub const XCC_GAS: Gas = Gas(20 * TGAS);

/// Create a CID for a string.
pub fn create_cid(value: &str) -> String {
    let hash = Code::Sha2_256.digest(value.to_string().as_bytes());
    let cid = Cid::new_v1(RAW, hash);
    cid.to_string()
}

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKeys {
    Projects,
    Vendors,
    Investors,
    Requests,
    Proposals,
    Contributions,
    ContributionHistory { accounts_hash: CryptoHash },
    Claims,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault, Owner, Upgrade)]
#[upgrade(hook = "owner")]
pub struct Contract {
    projects: TreeMap<AccountId, VersionedProject>,
    vendors: TreeMap<AccountId, VersionedVendor>,
    investors: TreeMap<AccountId, VersionedInvestor>,
    requests: UnorderedMap<(AccountId, String), VersionedRequest>,
    proposals: UnorderedMap<((AccountId, String), AccountId), VersionedProposal>,
    contributions:
        UnorderedMap<(AccountId, AccountId), UnorderedMap<String, VersionedContribution>>,
    claims: UnorderedMap<(AccountId, AccountId), VersionedClaim>,
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
            claims: UnorderedMap::new(StorageKeys::Claims),
        };
        Owner::init(&mut this, &owner_id);
        this
    }

    /// Assertions.

    /// Checks if given account has permissions of a admin or higher for given project.
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
