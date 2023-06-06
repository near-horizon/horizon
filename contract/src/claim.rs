use std::collections::HashSet;

use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    near_bindgen, require,
    serde::{Deserialize, Serialize},
    AccountId, Timestamp,
};
use near_sdk_contract_tools::standard::nep297::Event;

use crate::{
    events::Events,
    project::{Project, VersionedProject},
    Contract, ContractExt,
};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Eq, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum Claim {
    Sent {
        #[serde(with = "crate::dec_serde::u64_dec_format")]
        timestamp: Timestamp,
        message: String,
    },
    Accepted(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
    Rejected(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedClaim {
    V0(Claim),
}

impl From<VersionedClaim> for Claim {
    fn from(value: VersionedClaim) -> Self {
        match value {
            VersionedClaim::V0(c) => c,
        }
    }
}

impl From<&VersionedClaim> for Claim {
    fn from(value: &VersionedClaim) -> Self {
        match value {
            VersionedClaim::V0(c) => c.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn add_claim(&mut self, project_id: AccountId, message: String) {
        self.assert_is_project(&project_id);
        let claim = VersionedClaim::V0(Claim::Sent {
            timestamp: near_sdk::env::block_timestamp(),
            message: message.clone(),
        });
        self.claims.insert(
            (project_id.clone(), near_sdk::env::predecessor_account_id()),
            claim,
        );
        Events::AddClaim {
            project_id,
            account_id: near_sdk::env::predecessor_account_id(),
            message,
        }
        .emit();
    }

    pub fn accept_claim(&mut self, project_id: AccountId, account_id: AccountId) {
        self.assert_is_project(&project_id);
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_claim(&project_id, &account_id);
        self.claims
            .entry((project_id.clone(), account_id.clone()))
            .and_modify(|claim| {
                *claim = VersionedClaim::V0(Claim::Accepted(near_sdk::env::block_timestamp()));
            });
        self.projects
            .entry(project_id.clone())
            .and_modify(|old| {
                let mut project: Project = old.clone().into();
                project.founders.insert(account_id.clone());
                *old = VersionedProject::V2(project);
            })
            .or_insert(VersionedProject::new(HashSet::from_iter([
                account_id.clone()
            ])));
        Events::AcceptClaim {
            project_id,
            account_id,
        }
        .emit();
    }

    pub fn reject_claim(&mut self, project_id: AccountId, account_id: AccountId) {
        self.assert_is_project(&project_id);
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_claim(&project_id, &account_id);
        self.claims
            .entry((project_id.clone(), account_id.clone()))
            .and_modify(|claim| {
                *claim = VersionedClaim::V0(Claim::Rejected(near_sdk::env::block_timestamp()));
            });
        Events::RejectClaim {
            project_id,
            account_id,
        }
        .emit();
    }

    /// Views

    pub fn get_claims(&self) -> Vec<(AccountId, AccountId)> {
        self.claims.keys().cloned().collect()
    }

    pub fn get_claim(&self, project_id: AccountId, account_id: AccountId) -> Claim {
        self.claims
            .get(&(project_id, account_id))
            .expect("ERR_NOT_CLAIM")
            .into()
    }

    /// Assertions

    pub fn assert_is_claim(&self, project_id: &AccountId, account_id: &AccountId) {
        require!(
            self.claims
                .contains_key(&(project_id.clone(), account_id.clone())),
            "Account is not claimed"
        );
    }
}
