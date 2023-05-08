use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, require, AccountId};
use near_sdk_contract_tools::owner::Owner;
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::events::Events;
use crate::project::{Permission, Permissions};
use crate::{Contract, ContractExt};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct InvestorV0 {
    contact: String,
    permissions: HashMap<AccountId, Permission>,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct Investor {
    pub contact: String,
    pub permissions: Permissions,
    pub verified: bool,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedInvestor {
    V0(InvestorV0),
    V1(Investor),
}

impl From<VersionedInvestor> for Investor {
    fn from(value: VersionedInvestor) -> Self {
        match value {
            VersionedInvestor::V0(i) => Investor {
                contact: i.contact,
                permissions: {
                    let mut map = HashMap::new();
                    for (account_id, permission) in i.permissions {
                        let mut set = HashSet::new();
                        set.insert(permission);
                        map.insert(account_id, set);
                    }
                    map
                },
                verified: false,
            },
            VersionedInvestor::V1(i) => i,
        }
    }
}

impl From<&VersionedInvestor> for Investor {
    fn from(value: &VersionedInvestor) -> Self {
        match value {
            VersionedInvestor::V0(i) => Investor {
                contact: i.contact.clone(),
                permissions: {
                    let mut map = HashMap::new();
                    for (account_id, permission) in &i.permissions {
                        let mut set = HashSet::new();
                        set.insert(permission.clone());
                        map.insert(account_id.clone(), set);
                    }
                    map
                },
                verified: false,
            },
            VersionedInvestor::V1(i) => i.clone(),
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
                .map(|(account_id, investor)| (account_id, VersionedInvestor::V1(investor))),
        );
        Events::AddInvestors {
            investors: investors.keys().cloned().collect(),
        }
        .emit();
    }

    pub fn register_investor(&mut self, account_id: AccountId) {
        require!(
            !self.investors.contains_key(&account_id),
            "ERR_INVESTOR_EXISTS"
        );
        self.investors.insert(
            account_id.clone(),
            VersionedInvestor::V1(Investor {
                contact: "".to_string(),
                permissions: {
                    let mut map = HashMap::new();
                    map.insert(account_id.clone(), {
                        let mut set = HashSet::new();
                        set.insert(Permission::Admin);
                        set
                    });
                    map.insert(env::predecessor_account_id(), {
                        let mut set = HashSet::new();
                        set.insert(Permission::Admin);
                        set
                    });
                    map
                },
                verified: false,
            }),
        );
        Events::RegisterInvestor { account_id }.emit();
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
        for (account_id, investor) in investors.clone() {
            self.assert_can_edit_investor(account_id.clone(), env::predecessor_account_id());
            self.investors
                .entry(account_id)
                .and_modify(|old| {
                    *old = VersionedInvestor::V1(investor.clone());
                })
                .or_insert(VersionedInvestor::V1(investor));
        }
        Events::EditInvestors {
            investors: investors.keys().cloned().collect(),
        }
        .emit();
    }

    pub fn verify_investor(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.investors
            .entry(account_id.clone())
            .and_modify(|investor| {
                let mut old: Investor = investor.clone().into();
                old.verified = true;
                *investor = VersionedInvestor::V1(old);
            })
            .or_insert(VersionedInvestor::V1(Investor {
                contact: account_id.to_string(),
                permissions: {
                    let mut map = HashMap::new();
                    let mut set = HashSet::new();
                    set.insert(Permission::Admin);
                    map.insert(account_id.clone(), set);
                    map
                },
                verified: true,
            }));
        Events::VerifyInvestor { account_id }.emit();
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
                if let Some(set) = investor.permissions.get(&account_id) {
                    set.contains(&Permission::Admin)
                } else {
                    false
                }
            })
            .unwrap_or(false)
    }

    pub fn check_is_investor(&self, account_id: AccountId) -> bool {
        self.investors.contains_key(&account_id)
    }

    /// Assertions

    /// Assert if account can edit investor.
    pub(super) fn assert_can_edit_investor(&self, investor_id: AccountId, account_id: AccountId) {
        require!(
            self.check_is_investor_admin(investor_id, account_id.clone())
                || self.check_is_owner(&account_id),
            "ERR_NO_PERMISSION"
        );
    }
}
