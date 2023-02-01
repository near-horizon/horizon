use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Timestamp};
use std::collections::HashSet;

use crate::contribution::{Contribution, ContributionDetail, VersionedContribution};
use crate::contributor::VersionedContributor;
use crate::events::Events;
use crate::utils::{option_u64_dec_format, u64_dec_format};
use crate::{Contract, ContractExt};

/// An entity can be in different states because it can potentially have an end (through different
/// ways - legal issues, no funding...).
/// This is represented by the EntityStatus.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityStatus {
    Active,
    Flagged,
}

/// An entity can take different shapes, and currently we can categorize them in these types.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum EntityKind {
    Project,
    Organization,
    DAO,
}

/// Entity is something that is beyond a single person.
/// Something that has a start and potentially an end.
/// Note, that all the basic information like name, description and social information is stored in the `socialdb`.
#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Entity {
    name: String,
    status: EntityStatus,
    kind: EntityKind,
    #[serde(with = "u64_dec_format")]
    start_date: Timestamp,
    #[serde(with = "option_u64_dec_format")]
    end_date: Option<Timestamp>,
}

/// Permissions table for interaction between a contributor and an entity.
#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, PartialOrd, Hash, Clone,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Permission {
    Admin,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedEntity {
    Current(Entity),
}

impl From<VersionedEntity> for Entity {
    fn from(value: VersionedEntity) -> Self {
        match value {
            VersionedEntity::Current(e) => e,
        }
    }
}

#[near_bindgen]
impl Contract {
    /// Add new entity and given user as founding contributor.
    pub fn add_entity(
        &mut self,
        account_id: AccountId,
        name: String,
        kind: EntityKind,
        start_date: U64,
    ) {
        self.entities.insert(
            account_id.clone(),
            VersionedEntity::Current(Entity {
                name,
                status: EntityStatus::Active,
                kind,
                start_date: start_date.into(),
                end_date: None,
            }),
        );
        self.contributors
            .entry(env::predecessor_account_id())
            .or_insert(VersionedContributor::Current(Default::default()));
        self.contributions.insert(
            (account_id.clone(), env::predecessor_account_id()),
            VersionedContribution::Current(Contribution {
                permissions: HashSet::from([Permission::Admin]),
                current: ContributionDetail {
                    description: "".to_string(),
                    start_date: start_date.into(),
                    end_date: None,
                },
                history: vec![],
            }),
        );
        Events::AddEntity {
            entity_id: account_id,
        }
        .emit();
    }

    /// Moderator updates the entity details.
    pub fn set_entity(&mut self, account_id: AccountId, entity: Entity) {
        self.assert_moderator();
        self.entities
            .insert(account_id, VersionedEntity::Current(entity));
    }

    /// Views

    /// List out entities. By default list all of them.
    pub fn get_entities(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<(AccountId, Entity)> {
        let from_index = from_index.unwrap_or(0);
        let limit = limit.unwrap_or(self.entities.len().into());
        self.entities
            .into_iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .map(|(key, versioned_entity)| (key.clone(), versioned_entity.clone().into()))
            .collect()
    }

    /// List single entity details.
    pub fn get_entity(&self, account_id: AccountId) -> Entity {
        self.entities
            .get(&account_id)
            .expect("ERR_NO_ENTITY")
            .clone()
            .into()
    }
}
