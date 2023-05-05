use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{near_bindgen, AccountId};
use near_sdk_contract_tools::owner::Owner;
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::events::Events;
use crate::project::Permission;
use crate::{Contract, ContractExt};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct Investor {
    contact: String,
    permissions: HashMap<AccountId, Permission>,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedInvestor {
    V0(Investor),
}

impl From<VersionedInvestor> for Investor {
    fn from(value: VersionedInvestor) -> Self {
        match value {
            VersionedInvestor::V0(i) => i,
        }
    }
}

impl From<&VersionedInvestor> for Investor {
    fn from(value: &VersionedInvestor) -> Self {
        match value {
            VersionedInvestor::V0(i) => i.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    /// Add a list of investors to the existing collection.
    pub fn add_investors(&mut self, investors: HashMap<AccountId, Investor>) {
        self.assert_owner();
        self.investors.extend(
            investors
                .clone()
                .into_iter()
                .map(|(account_id, investor)| (account_id, VersionedInvestor::V0(investor))),
        );
        Events::AddInvestors {
            investors: investors.keys().cloned().collect(),
        }
        .emit();
    }

    /// Remove a list of investors from the existing collection.
    pub fn remove_investors(&mut self, investors: HashSet<AccountId>) {
        self.assert_owner();
        for investor in investors.clone() {
            self.investors.remove(&investor);
        }
        Events::RemoveInvestors { investors }.emit();
    }

    /// Edit a list of investors.
    pub fn edit_investor(&mut self, investors: HashMap<AccountId, Investor>) {
        self.assert_owner();
        for (account_id, investor) in investors.clone() {
            self.investors
                .entry(account_id)
                .and_modify(|old| {
                    *old = VersionedInvestor::V0(investor.clone());
                })
                .or_insert(VersionedInvestor::V0(investor));
        }
        Events::EditInvestors {
            investors: investors.keys().cloned().collect(),
        }
        .emit();
    }

    /// Views

    /// Fetch a list of investors with optional pagination.
    pub fn get_investors(&self, from_index: Option<u64>, limit: Option<u64>) -> HashSet<AccountId> {
        let from_index = from_index.unwrap_or(0) as usize;
        let limit = limit.unwrap_or(self.projects.len().into()) as usize;
        self.investors
            .keys()
            .skip(from_index)
            .take(limit)
            .cloned()
            .collect()
    }

    /// Get details of a specific investor.
    pub fn get_investor(&self, account_id: AccountId) -> Investor {
        self.investors
            .get(&account_id)
            .expect("ERR_NO_INVESTOR")
            .into()
    }

    pub fn check_is_investor_admin(&self, investor_id: AccountId, account_id: AccountId) -> bool {
        self.investors
            .get(&investor_id)
            .map(|investor| {
                let investor: Investor = investor.into();
                matches!(
                    investor.permissions.get(&account_id),
                    Some(Permission::Admin)
                )
            })
            .unwrap_or(false)
    }

    pub fn check_is_investor(&self, account_id: AccountId) -> bool {
        self.investors.contains_key(&account_id)
    }
}
