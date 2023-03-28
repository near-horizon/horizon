use std::collections::HashSet;

use near_sdk::{AccountId, Timestamp};
use near_sdk_contract_tools::event;

use crate::dec_serde::u64_dec_format;

#[event(standard = "near_contribute", version = "1", serde = "near_sdk::serde")]
pub enum Events {
    AddProject {
        account_id: AccountId,
    },
    EditProject {
        account_id: AccountId,
    },
    RemoveProject {
        account_id: AccountId,
    },
    AddVendor {
        account_id: AccountId,
    },
    EditVendor {
        account_id: AccountId,
    },
    RemoveVendor {
        account_id: AccountId,
    },
    PostContributionNeed {
        entity_id: AccountId,
        cid: String,
        description: String,
    },
    RequestContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
    },
    RejectContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
    },
    ApproveContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
    FinishContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        #[serde(with = "u64_dec_format")]
        end_date: Timestamp,
    },
    InviteContributor {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
    AcceptInvite {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
    AddInvestors {
        investors: HashSet<AccountId>,
    },
    RemoveInvestors {
        investors: HashSet<AccountId>,
    },
    EditInvestors {
        investors: HashSet<AccountId>,
    },
}
