use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{assert_one_yocto, env, near_bindgen, AccountId};
use std::collections::HashSet;

use crate::{events::Events, Contract, ContractExt};

/// Types of contributions a contributor is looking to do.
#[derive(
    BorshSerialize,
    BorshDeserialize,
    Serialize,
    Deserialize,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
    Clone,
)]
#[serde(crate = "near_sdk::serde")]
pub enum ContributionType {
    Development,
    Investment,
    Marketing,
    Legal,
    Other(String),
    Founding,
}

impl Default for ContributionType {
    fn default() -> Self {
        ContributionType::Other(String::new())
    }
}

/// Details of a contritbutor.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct Contributor {
    /// The types of contributions the contributor is offering.
    contribution_types: HashSet<ContributionType>,
    /// The skills the contributor has.
    skills: HashSet<String>,
    /// The resume of the contributor.
    resume: String,
    /// Whether the contributor is looking for work.
    looking_for_work: bool,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedContributor {
    Current(Contributor),
}

impl VersionedContributor {
    pub fn unwrap(self) -> Contributor {
        match self {
            VersionedContributor::Current(c) => c,
        }
    }
}

impl From<VersionedContributor> for Contributor {
    fn from(value: VersionedContributor) -> Self {
        match value {
            VersionedContributor::Current(c) => c,
        }
    }
}

#[near_bindgen]
impl Contract {
    /// Register as a contributor.
    #[payable]
    pub fn register(
        &mut self,
        contribution_types: HashSet<ContributionType>,
        skills: HashSet<String>,
        resume: String,
    ) {
        assert_one_yocto();
        self.contributors.insert(
            env::predecessor_account_id(),
            VersionedContributor::Current(Contributor {
                contribution_types,
                skills,
                resume,
                looking_for_work: true,
            }),
        );
        Events::RegisterContributor {
            contributor_id: env::predecessor_account_id(),
        }
        .emit();
    }

    /// Edit contributor profile.
    pub fn edit_contributor(&mut self, contributor: Contributor) {
        self.contributors.insert(
            env::predecessor_account_id(),
            VersionedContributor::Current(contributor),
        );
    }

    /// Views

    /// Get all contributor account IDs.
    pub fn get_contributors(&self) -> HashSet<AccountId> {
        self.contributors.keys().cloned().collect()
    }

    /// Check if account is registered as contributor.
    pub fn check_is_contributor(&self, account_id: AccountId) -> bool {
        self.contributors.contains_key(&account_id)
    }

    /// Get contributor details.
    pub fn get_contributor(&self, account_id: AccountId) -> Option<Contributor> {
        self.contributors
            .get(&account_id)
            .map(|contributor| contributor.clone().into())
    }

    /// Get all contribution types.
    pub fn get_contribution_types(&self) -> Vec<ContributionType> {
        vec![
            ContributionType::Development,
            ContributionType::Investment,
            ContributionType::Marketing,
            ContributionType::Legal,
            ContributionType::Founding,
        ]
    }
}
