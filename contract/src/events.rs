use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, serde_json, AccountId, Timestamp};

use crate::contributor::ContributionType;
use crate::dec_serde::u64_dec_format;

#[derive(Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Events {
    AddEntity {
        entity_id: AccountId,
    },
    RegisterContributor {
        contributor_id: AccountId,
    },
    PostContributionNeed {
        entity_id: AccountId,
        cid: String,
        description: String,
        contribution_type: ContributionType,
    },
    RequestContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        contribution_type: ContributionType,
    },
    RejectContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
    },
    ApproveContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        contribution_type: ContributionType,
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
        contribution_type: ContributionType,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
    AcceptInvite {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        contribution_type: ContributionType,
        #[serde(with = "u64_dec_format")]
        start_date: Timestamp,
    },
}

impl Events {
    pub(crate) fn emit(self) {
        env::log_str(&format!(
            "EVENT_JSON:{}",
            &serde_json::to_string(&self).unwrap()
        ));
    }
}
