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
    request::{PaymentSource, PaymentType, RequestType},
    Contract, ContractExt,
};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Proposal {
    pub request_id: (AccountId, String),
    pub vendor_id: AccountId,
    pub title: String,
    pub description: String,
    #[serde(with = "crate::dec_serde::u64_dec_format")]
    pub start_date: Timestamp,
    #[serde(with = "crate::dec_serde::u64_dec_format")]
    pub end_date: Timestamp,
    pub price: u128,
    pub proposal_type: RequestType,
    pub payment_type: PaymentType,
    pub payment_source: PaymentSource,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedProposal {
    V0(Proposal),
}

impl From<VersionedProposal> for Proposal {
    fn from(value: VersionedProposal) -> Self {
        match value {
            VersionedProposal::V0(p) => p,
        }
    }
}

impl From<&VersionedProposal> for Proposal {
    fn from(value: &VersionedProposal) -> Self {
        match value {
            VersionedProposal::V0(p) => p.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn add_proposal(&mut self, proposal: Proposal) {
        self.assert_is_vendor(&proposal.vendor_id);
        self.assert_is_request(&proposal.request_id.1, &proposal.request_id.0);
        self.assert_can_edit_vendor(
            &proposal.vendor_id,
            &near_sdk::env::predecessor_account_id(),
        );
        let key = (proposal.request_id.clone(), proposal.vendor_id.clone());
        self.proposals
            .insert(key.clone(), VersionedProposal::V0(proposal));
        Events::AddProposal {
            project_id: key.0 .0,
            cid: key.0 .1,
            vendor_id: key.1,
        }
        .emit();
    }

    pub fn edit_proposal(&mut self, proposal: Proposal) {
        self.assert_is_vendor(&proposal.vendor_id);
        self.assert_is_request(&proposal.request_id.1, &proposal.request_id.0);
        self.assert_can_edit_vendor(
            &proposal.vendor_id,
            &near_sdk::env::predecessor_account_id(),
        );
        let key = (proposal.request_id.clone(), proposal.vendor_id.clone());
        self.assert_is_proposal(
            &proposal.request_id.0,
            &proposal.request_id.1,
            &proposal.vendor_id,
        );
        self.proposals
            .insert(key.clone(), VersionedProposal::V0(proposal));
        Events::EditProposal {
            project_id: key.0 .0,
            cid: key.0 .1,
            vendor_id: key.1,
        }
        .emit();
    }

    pub fn remove_proposal(&mut self, project_id: AccountId, cid: String, vendor_id: AccountId) {
        self.assert_is_vendor(&vendor_id);
        self.assert_is_request(&cid, &project_id);
        self.assert_can_edit_vendor(&vendor_id, &near_sdk::env::predecessor_account_id());
        let key = ((project_id.clone(), cid.clone()), vendor_id.clone());
        self.proposals.remove(&key);
        Events::RemoveProposal {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn reject_proposal(&mut self, project_id: AccountId, cid: String, vendor_id: AccountId) {
        self.assert_is_vendor(&vendor_id);
        self.assert_is_request(&cid, &project_id);
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        let key = ((project_id.clone(), cid.clone()), vendor_id.clone());
        self.proposals.remove(&key);
        Events::RejectProposal {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    /// Views

    pub fn get_project_proposals(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.proposals
            .keys()
            .filter(|((project_id, _), _)| &account_id == project_id)
            .cloned()
            .collect()
    }

    pub fn get_request_proposals(
        &self,
        account_id: AccountId,
        cid: String,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.proposals
            .keys()
            .filter(|((project_id, stored_cid), _)| &account_id == project_id && &cid == stored_cid)
            .cloned()
            .collect()
    }

    pub fn get_vendor_proposals(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.proposals
            .keys()
            .filter(|(_, vendor_id)| &account_id == vendor_id)
            .cloned()
            .collect()
    }

    pub fn get_admin_proposals(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.proposals
            .keys()
            .filter(|((project_id, _), _)| self.check_is_project_admin(project_id, &account_id))
            .cloned()
            .collect()
    }

    pub fn get_proposal(
        &self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) -> Proposal {
        self.proposals
            .get(&((project_id, cid), vendor_id))
            .expect("ERR_NO_PROPOSAL")
            .into()
    }

    pub fn check_if_proposed(
        &self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) -> bool {
        self.proposals.contains_key(&((project_id, cid), vendor_id))
    }

    pub(super) fn assert_is_proposal(
        &self,
        project_id: &AccountId,
        cid: &str,
        vendor_id: &AccountId,
    ) {
        require!(
            self.proposals
                .contains_key(&((project_id.clone(), cid.to_string()), vendor_id.clone())),
            "ERR_NOT_PROPOSAL"
        );
    }
}
