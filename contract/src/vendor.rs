use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, require, AccountId};
use near_sdk_contract_tools::owner::Owner;
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::project::{Permission, Permissions};
use crate::{events::Events, Contract, ContractExt};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct Vendor {
    permissions: Permissions,
}

impl Vendor {
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        if let Some(permission) = self.permissions.get(account_id) {
            permission.contains(&Permission::Admin)
        } else {
            false
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedVendor {
    V0(Vendor),
}

impl From<VersionedVendor> for Vendor {
    fn from(value: VersionedVendor) -> Self {
        match value {
            VersionedVendor::V0(c) => c,
        }
    }
}

impl From<&VersionedVendor> for Vendor {
    fn from(value: &VersionedVendor) -> Self {
        match value {
            VersionedVendor::V0(c) => c.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn add_vendor(
        &mut self,
        account_id: AccountId,
        permissions: HashMap<AccountId, HashSet<Permission>>,
    ) {
        self.assert_owner();
        self.vendors.insert(
            account_id.clone(),
            VersionedVendor::V0(Vendor { permissions }),
        );
        Events::AddVendor { account_id }.emit();
    }

    /// Edit vendor details.
    pub fn edit_vendor(&mut self, account_id: AccountId, vendor: Vendor) {
        self.assert_can_edit_vendor(&account_id, &env::predecessor_account_id());
        self.vendors
            .entry(account_id.clone())
            .and_modify(|old| {
                *old = VersionedVendor::V0(vendor.clone());
            })
            .or_insert(VersionedVendor::V0(vendor));
        Events::EditVendor { account_id }.emit();
    }

    /// Remove vendor.
    pub fn remove_vendor(&mut self, account_id: AccountId) {
        self.assert_can_edit_vendor(&account_id, &env::predecessor_account_id());
        self.vendors.remove(&account_id);
        Events::RemoveVendor { account_id }.emit();
    }

    /// Views

    /// Get all contributor account IDs.
    pub fn get_vendors(&self) -> HashSet<AccountId> {
        self.vendors.keys().cloned().collect()
    }

    pub fn get_admin_vendors(&self, account_id: AccountId) -> HashSet<AccountId> {
        self.vendors
            .into_iter()
            .filter(|(_, vendor)| Vendor::from(vendor.clone()).is_admin(&account_id))
            .map(|(vendor_id, _)| vendor_id.clone())
            .collect()
    }

    /// Check if account is registered as contributor.
    pub fn check_is_vendor(&self, account_id: &AccountId) -> bool {
        self.vendors.contains_key(account_id)
    }

    /// Get vendor details.
    pub fn get_vendor(&self, account_id: AccountId) -> Vendor {
        self.vendors
            .get(&account_id)
            .expect("ERR_VENDOR_NOT_FOUND")
            .into()
    }

    /// Check if given account ID is admin or higher for givent vendor.
    pub fn check_is_vendor_admin(&self, vendor_id: &AccountId, account_id: &AccountId) -> bool {
        let Some(versioned_vendor) = self.vendors.get(vendor_id) else {
            return false;
        };
        let vendor: Vendor = versioned_vendor.into();
        vendor.is_admin(account_id)
    }

    /// Assertions

    /// Check whether the given account can edit the vendor with the given ID.
    pub(super) fn assert_can_edit_vendor(&self, vendor_id: &AccountId, account_id: &AccountId) {
        require!(
            self.check_is_vendor_admin(vendor_id, account_id) || self.check_is_owner(account_id),
            "ERR_NO_PERMISSION"
        );
    }

    pub(super) fn assert_is_vendor(&self, account_id: &AccountId) {
        require!(self.vendors.contains_key(account_id), "ERR_NOT_VENDOR");
    }
}
