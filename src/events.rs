use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, serde_json, AccountId, Timestamp};

use crate::utils::u64_dec_format;

#[derive(Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Events {
    AddEntity {
        entity_id: AccountId,
    },
    RegisterContributor {
        contributor_id: AccountId,
    },
    RequestContribution {
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
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
}

impl Events {
    pub(crate) fn emit(self) {
        env::log_str(&format!(
            "EVENT_JSON:{}",
            &serde_json::to_string(&self).unwrap()
        ));
    }
}
