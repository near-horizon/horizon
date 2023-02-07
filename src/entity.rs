use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Timestamp};
use std::collections::{HashMap, HashSet};

use crate::contribution::{
    Contribution, ContributionDetail, ContributionInvite, VersionedContribution,
    VersionedContributionInvite,
};
use crate::contributor::{ContributionType, VersionedContributor};
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
                    contribution_type: ContributionType::Other("Founding".to_string()),
                    end_date: None,
                    need: None,
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

    /// Invite a user as a contributor to an entity.
    pub fn invite_contributor(
        &mut self,
        entity_id: AccountId,
        contributor_id: AccountId,
        description: String,
        contribution_type: ContributionType,
        start_date: U64,
        permissions: HashSet<Permission>,
    ) {
        self.assert_manager_or_higher(&entity_id, &env::predecessor_account_id());
        self.contributors
            .entry(contributor_id.clone())
            .or_insert(VersionedContributor::Current(Default::default()));
        self.invites.insert(
            (entity_id.clone(), contributor_id.clone()),
            VersionedContributionInvite::Current(ContributionInvite {
                permissions,
                description: description.clone(),
                contribution_type: contribution_type.clone(),
                start_date: start_date.clone().into(),
            }),
        );
        Events::InviteContributor {
            entity_id,
            contributor_id,
            description,
            contribution_type,
            start_date: start_date.into(),
        }
        .emit()
    }

    /// Accept a contribution invite from an entity with the given account ID.
    pub fn accept_invite(&mut self, account_id: AccountId) {
        let invite = ContributionInvite::from(
            self.invites
                .remove(&(account_id.clone(), env::predecessor_account_id()))
                .expect("ERR_NO_INVITE"),
        );
        let details = ContributionDetail {
            description: invite.description.clone(),
            contribution_type: invite.contribution_type.clone(),
            start_date: invite.start_date.clone(),
            end_date: None,
            need: None,
        };
        self.contributions
            .entry((account_id.clone(), env::predecessor_account_id()))
            .and_modify(|v_old| {
                let mut old = Contribution::from(v_old.clone());
                old.history.push(old.current);
                old.current = details.clone();
                old.permissions = invite.permissions.clone();
                *v_old = VersionedContribution::Current(old);
            })
            .or_insert(VersionedContribution::Current(Contribution {
                permissions: invite.permissions.clone(),
                current: details.clone(),
                history: vec![],
            }));
        Events::AcceptInvite {
            entity_id: account_id,
            contributor_id: env::predecessor_account_id(),
            description: invite.description,
            contribution_type: invite.contribution_type,
            start_date: invite.start_date,
        }
        .emit();
    }

    /// Reject a contribution inivte from an entity with the given account ID.
    pub fn reject_invite(&mut self, account_id: AccountId) {
        self.invites
            .remove(&(account_id, env::predecessor_account_id()))
            .expect("ERR_NO_INVITE");
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

    /// List invites sent by entity with given account ID.
    pub fn get_entity_invites(
        &self,
        account_id: AccountId,
    ) -> HashMap<AccountId, ContributionInvite> {
        self.invites
            .into_iter()
            .filter_map(|((entity_id, contributor_id), invite)| {
                (entity_id == &account_id)
                    .then_some((contributor_id.clone(), invite.clone().into()))
            })
            .collect()
    }

    /// List invites sent to contributor with given account ID.
    pub fn get_contributor_invites(
        &self,
        account_id: AccountId,
    ) -> HashMap<AccountId, ContributionInvite> {
        self.invites
            .into_iter()
            .filter_map(|((entity_id, contributor_id), invite)| {
                (contributor_id == &account_id)
                    .then_some((entity_id.clone(), invite.clone().into()))
            })
            .collect()
    }

    /// Get invite details for entity and contributor with given IDs.
    pub fn get_invite(
        &self,
        entity_id: AccountId,
        contributor_id: AccountId,
    ) -> Option<ContributionInvite> {
        self.invites
            .get(&(entity_id, contributor_id))
            .map(|invite| invite.clone().into())
    }
}
