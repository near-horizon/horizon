use std::collections::HashSet;

use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    near_bindgen, require,
    serde::{Deserialize, Serialize},
    store::UnorderedMap,
    AccountId, Timestamp,
};
use near_sdk_contract_tools::standard::nep297::Event;

use crate::{events::Events, proposal::Proposal, Contract, ContractExt, StorageKeys};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Eq, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct ContributionAction {
    description: String,
    #[serde(with = "crate::dec_serde::u64_dec_format")]
    start_date: Timestamp,
    #[serde(with = "crate::dec_serde::option_u64_dec_format")]
    end_date: Option<Timestamp>,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Eq, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum ContributionStatus {
    Created(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
    Accepted(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
    Ongoing,
    Delivered(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
    Completed(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
    Rejected(#[serde(with = "crate::dec_serde::u64_dec_format")] Timestamp),
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Contribution {
    proposal_id: ((AccountId, String), AccountId),
    status: ContributionStatus,
    #[serde(default)]
    actions: Vec<ContributionAction>,
    #[serde(default)]
    vendor_feedback: Option<String>,
    #[serde(default)]
    project_feedback: Option<String>,
    price: u128,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedContribution {
    V0(Contribution),
}

impl From<VersionedContribution> for Contribution {
    fn from(value: VersionedContribution) -> Self {
        match value {
            VersionedContribution::V0(c) => c,
        }
    }
}

impl From<&VersionedContribution> for Contribution {
    fn from(value: &VersionedContribution) -> Self {
        match value {
            VersionedContribution::V0(c) => c.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn add_contribution(&mut self, project_id: AccountId, cid: String, vendor_id: AccountId) {
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_proposal(&project_id, &cid, &vendor_id);
        let key = (project_id.clone(), vendor_id.clone());
        let proposal_id = ((project_id.clone(), cid.clone()), vendor_id.clone());
        let proposal: Proposal = self.proposals.get(&proposal_id).unwrap().into();
        let contribution = VersionedContribution::V0(Contribution {
            proposal_id,
            status: ContributionStatus::Created(near_sdk::env::block_timestamp()),
            actions: vec![],
            vendor_feedback: None,
            project_feedback: None,
            price: proposal.price,
        });
        self.contributions
            .entry(key)
            .and_modify(|old| {
                old.insert(cid.clone(), contribution.clone());
            })
            .or_insert({
                let mut map = UnorderedMap::new(StorageKeys::ContributionHistory {
                    accounts_hash: near_sdk::env::sha256_array(
                        format!("{project_id}-{vendor_id}").as_bytes(),
                    ),
                });
                map.insert(cid.clone(), contribution);
                map
            });
        Events::AddContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn accept_contribution(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) {
        self.assert_can_edit_vendor(&vendor_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            // Get the contribution history between the project and vendor.
            .entry((project_id.clone(), vendor_id.clone()))
            // Modify the history entry.
            .and_modify(|history| {
                // Get the specific contribution entry and change its status to accepted.
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    contribution.status =
                        ContributionStatus::Accepted(near_sdk::env::block_timestamp());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::AcceptContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn reject_contribution(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) {
        self.assert_can_edit_vendor(&vendor_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            // Get the contribution history between the project and vendor.
            .entry((project_id.clone(), vendor_id.clone()))
            // Modify the history entry.
            .and_modify(|history| {
                // Get the specific contribution entry and change its status to rejected.
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    contribution.status =
                        ContributionStatus::Rejected(near_sdk::env::block_timestamp());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::RejectContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn remove_contribution(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) {
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            // Get the contribution history between the project and vendor.
            .entry((project_id.clone(), vendor_id.clone()))
            // Modify the history entry.
            .and_modify(|history| {
                let contribution: Contribution = history.get(&cid).unwrap().clone().into();
                match contribution.status {
                    ContributionStatus::Created(_) | ContributionStatus::Rejected(_) => {
                        // Remove the specific contribution entry.
                        history.remove(&cid);
                    }
                    _ => {}
                };
            });
        Events::RemoveContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn add_contribution_action(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
        description: String,
    ) {
        self.assert_can_edit_contribution(&project_id, &vendor_id);
        self.contributions
            .entry((project_id.clone(), vendor_id.clone()))
            .and_modify(|history| {
                require!(history.contains_key(&cid), "ERR_NOT_CONTRIBUTION");
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    contribution.status = ContributionStatus::Ongoing;
                    let timestamp = near_sdk::env::block_timestamp();
                    if !contribution.actions.is_empty() {
                        if let Some(latest) = contribution.actions.last_mut() {
                            require!(timestamp > latest.start_date, "ERR_INVALID_START_DATE");
                            latest.end_date = Some(timestamp);
                        }
                    }
                    contribution.actions.push(ContributionAction {
                        description: description.clone(),
                        start_date: timestamp,
                        end_date: None,
                    });
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::AddContributionAction {
            project_id,
            vendor_id,
            cid,
            description,
        }
        .emit();
    }

    pub fn deliver_contribution(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) {
        self.assert_can_edit_vendor(&vendor_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            .entry((project_id.clone(), vendor_id.clone()))
            .and_modify(|history| {
                require!(history.contains_key(&cid), "ERR_NOT_CONTRIBUTION");
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    require!(
                        contribution.status == ContributionStatus::Ongoing,
                        "ERR_CONTRIBUTION_NOT_ONGOING"
                    );
                    contribution.status =
                        ContributionStatus::Delivered(near_sdk::env::block_timestamp());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::DeliverContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn complete_contribution(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) {
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            .entry((project_id.clone(), vendor_id.clone()))
            .and_modify(|history| {
                require!(history.contains_key(&cid), "ERR_NOT_CONTRIBUTION");
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    require!(
                        matches!(contribution.status, ContributionStatus::Delivered(_)),
                        "ERR_CONTRIBUTION_NOT_DELIVERED"
                    );
                    contribution.status =
                        ContributionStatus::Completed(near_sdk::env::block_timestamp());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::CompleteContribution {
            project_id,
            vendor_id,
            cid,
        }
        .emit();
    }

    pub fn give_vendor_feedback(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
        feedback: String,
    ) {
        self.assert_can_edit_project(&project_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            .entry((project_id.clone(), vendor_id.clone()))
            .and_modify(|history| {
                require!(history.contains_key(&cid), "ERR_NOT_CONTRIBUTION");
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    require!(
                        matches!(contribution.status, ContributionStatus::Completed(_)),
                        "ERR_CONTRIBUTION_NOT_COMPLETED"
                    );
                    contribution.vendor_feedback = Some(feedback.clone());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::GiveVendorFeedback {
            project_id,
            vendor_id,
            cid,
            feedback,
        }
        .emit();
    }

    pub fn give_project_feedback(
        &mut self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
        feedback: String,
    ) {
        self.assert_can_edit_vendor(&vendor_id, &near_sdk::env::predecessor_account_id());
        self.assert_is_contribution(&project_id, &cid, &vendor_id);
        self.contributions
            .entry((project_id.clone(), vendor_id.clone()))
            .and_modify(|history| {
                require!(history.contains_key(&cid), "ERR_NOT_CONTRIBUTION");
                history.entry(cid.clone()).and_modify(|old| {
                    let mut contribution: Contribution = old.clone().into();
                    require!(
                        matches!(contribution.status, ContributionStatus::Completed(_)),
                        "ERR_CONTRIBUTION_NOT_COMPLETED"
                    );
                    contribution.project_feedback = Some(feedback.clone());
                    *old = VersionedContribution::V0(contribution);
                });
            });
        Events::GiveProjectFeedback {
            project_id,
            vendor_id,
            cid,
            feedback,
        }
        .emit();
    }

    /// Veiws

    pub fn get_admin_contributions(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.contributions
            .keys()
            .filter_map(|(project_id, vendor_id)| {
                self.check_is_project_admin(project_id, &account_id)
                    .then_some(
                        self.contributions
                            .get(&(project_id.clone(), vendor_id.clone()))
                            .unwrap()
                            .keys()
                            .map(|cid| ((project_id.clone(), cid.clone()), vendor_id.clone())),
                    )
            })
            .flatten()
            .collect()
    }

    pub fn get_project_contributions(
        &self,
        account_id: AccountId,
    ) -> HashSet<(AccountId, AccountId)> {
        self.contributions
            .keys()
            .filter(|(project_id, _)| project_id == &account_id)
            .cloned()
            .collect()
    }

    pub fn get_vendor_contributions(
        &self,
        account_id: AccountId,
    ) -> HashSet<(AccountId, AccountId)> {
        self.contributions
            .keys()
            .filter(|(_, vendor_id)| vendor_id == &account_id)
            .cloned()
            .collect()
    }

    pub fn get_project_completed_contributions(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.get_project_contributions(account_id)
            .into_iter()
            .flat_map(|(project_id, vendor_id)| {
                self.contributions
                    .get(&(project_id.clone(), vendor_id.clone()))
                    .unwrap()
                    .into_iter()
                    .filter_map(move |(cid, versioned_contribution)| {
                        let contribution: Contribution = versioned_contribution.into();
                        matches!(contribution.status, ContributionStatus::Completed(_))
                            .then_some(((project_id.clone(), cid.clone()), vendor_id.clone()))
                    })
            })
            .collect()
    }

    pub fn get_vendor_completed_contributions(
        &self,
        account_id: AccountId,
    ) -> HashSet<((AccountId, String), AccountId)> {
        self.get_vendor_contributions(account_id)
            .into_iter()
            .flat_map(|(project_id, vendor_id)| {
                self.contributions
                    .get(&(project_id.clone(), vendor_id.clone()))
                    .unwrap()
                    .into_iter()
                    .filter_map(move |(cid, versioned_contribution)| {
                        let contribution: Contribution = versioned_contribution.into();
                        matches!(contribution.status, ContributionStatus::Completed(_))
                            .then_some(((project_id.clone(), cid.clone()), vendor_id.clone()))
                    })
            })
            .collect()
    }

    pub fn get_contribution_history(
        &self,
        project_id: AccountId,
        vendor_id: AccountId,
    ) -> HashSet<String> {
        self.contributions
            .get(&(project_id, vendor_id))
            .expect("ERR_NOT_CONTRIBUTION")
            .keys()
            .cloned()
            .collect()
    }

    pub fn get_contribution(
        &self,
        project_id: AccountId,
        cid: String,
        vendor_id: AccountId,
    ) -> Contribution {
        self.contributions
            .get(&(project_id, vendor_id))
            .expect("ERR_NOT_CONTRIBUTION")
            .get(&cid)
            .expect("ERR_NOT_CONTRIBUTION")
            .into()
    }

    /// Assertions

    pub(super) fn assert_is_contribution(
        &self,
        project_id: &AccountId,
        cid: &str,
        vendor_id: &AccountId,
    ) {
        require!(
            self.contributions
                .contains_key(&(project_id.clone(), vendor_id.clone())),
            "ERR_NOT_CONTRIBUTION"
        );
        let history = self
            .contributions
            .get(&(project_id.clone(), vendor_id.clone()))
            .unwrap();
        require!(history.contains_key(cid), "ERR_NOT_CONTRIBUTION");
    }

    pub(super) fn assert_can_edit_contribution(
        &self,
        project_id: &AccountId,
        vendor_id: &AccountId,
    ) {
        let account_id = near_sdk::env::predecessor_account_id();
        require!(
            self.check_is_project_admin(project_id, &account_id)
                || self.check_is_vendor_admin(vendor_id, &account_id),
            "ERR_NO_PERMISSION"
        );
    }
}
