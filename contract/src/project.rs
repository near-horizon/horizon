use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, require, AccountId, Timestamp};
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::dec_serde::u64_dec_format;
use crate::events::Events;
use crate::{Contract, ContractExt};

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenDetail {
    pub name: String,
    pub symbol: String,
    pub link: String,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum TechLead {
    CTO(AccountId),
    Founder(AccountId),
    None,
}

impl Default for TechLead {
    fn default() -> Self {
        Self::None
    }
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Graduation {
    pub pitch_deck: String,
    pub white_paper: String,
    pub roadmap: String,
    pub team: String,
    pub tam: String,
    pub success_metrics: String,
    pub demo: String,
    pub code: String,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct PrivateGraduation {
    pub legal: String,
    pub budget: String,
    pub monetazation: String,
    pub valuation: String,
    pub gtm: String,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct PrivateData {
    pub win_reason: String,
    pub risks: String,
    pub needs: String,
    pub graduation: PrivateGraduation,
}

/// Permissions table for interaction between a contributor and an entity.
#[derive(
    BorshSerialize,
    BorshDeserialize,
    Deserialize,
    Serialize,
    PartialEq,
    Eq,
    PartialOrd,
    Hash,
    Clone,
    Debug,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Permission {
    Admin,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Application {
    #[serde(default)]
    pub integration: String,
    #[serde(default)]
    pub why: String,
    #[serde(default)]
    pub partners: String,
    #[serde(default)]
    pub token: Option<TokenDetail>,
    #[serde(default)]
    pub contact: Option<String>,
    #[serde(default)]
    pub geo: Option<String>,
    #[serde(default)]
    pub success_position: String,
    #[serde(default)]
    pub vision: String,
    #[serde(default)]
    pub tech_lead: TechLead,
    #[serde(default)]
    pub team: HashMap<AccountId, HashSet<Permission>>,
    #[serde(default)]
    pub graduation: Option<Graduation>,
    #[serde(default)]
    pub private: Option<PrivateData>,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum ApplicationStatus {
    NotSubmitted,
    Submitted(#[serde(with = "u64_dec_format")] Timestamp),
    Rejected(String),
    Accepted,
}

impl Default for ApplicationStatus {
    fn default() -> Self {
        Self::NotSubmitted
    }
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone, Default)]
#[serde(crate = "near_sdk::serde")]
pub struct Project {
    pub founders: HashSet<AccountId>,
    pub application: Option<Application>,
    pub application_status: ApplicationStatus,
    pub graduation_status: ApplicationStatus,
}

impl Project {
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        self.founders.contains(account_id)
            || if let Some(application) = &self.application {
                application.team.contains_key(account_id)
            } else {
                false
            }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedProject {
    V0(Project),
}

impl Default for VersionedProject {
    fn default() -> Self {
        Self::V0(Project {
            founders: HashSet::new(),
            application: None,
            application_status: ApplicationStatus::NotSubmitted,
            graduation_status: ApplicationStatus::NotSubmitted,
        })
    }
}

impl From<VersionedProject> for Project {
    fn from(value: VersionedProject) -> Self {
        match value {
            VersionedProject::V0(e) => e,
        }
    }
}

impl From<&VersionedProject> for Project {
    fn from(value: &VersionedProject) -> Self {
        match value {
            VersionedProject::V0(e) => e.clone(),
        }
    }
}

impl VersionedProject {
    pub fn new(founders: HashSet<AccountId>) -> Self {
        Self::V0(Project {
            founders,
            application: None,
            application_status: ApplicationStatus::NotSubmitted,
            graduation_status: ApplicationStatus::NotSubmitted,
        })
    }
}

#[near_bindgen]
impl Contract {
    /// Add new project and given user as founding contributor.
    pub fn add_entity(&mut self, account_id: AccountId) {
        if self.projects.contains_key(&account_id) {
            env::panic_str("ERR_ENTITY_EXISTS");
        }
        self.projects.insert(
            account_id.clone(),
            VersionedProject::new(HashSet::from_iter([env::predecessor_account_id()])),
        );
        Events::AddProject { account_id }.emit();
    }

    /// Edit project details.
    pub fn edit_project(&mut self, account_id: AccountId, project: Project) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects
            .entry(account_id.clone())
            .and_modify(|existing| {
                *existing = VersionedProject::V0(project.clone());
            })
            .or_insert(VersionedProject::V0(project));
        Events::EditProject { account_id }.emit();
    }

    /// Remove project.
    pub fn remove_project(&mut self, account_id: AccountId) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.remove(&account_id);
        Events::RemoveProject { account_id }.emit();
    }

    /// Views

    /// List out projects. By default list all of them.
    pub fn get_projects(&self, from_index: Option<u64>, limit: Option<u64>) -> HashSet<AccountId> {
        let from_index = from_index.unwrap_or(0) as usize;
        let limit = limit.unwrap_or(self.projects.len().into()) as usize;
        self.projects
            .keys()
            .skip(from_index)
            .take(limit)
            .cloned()
            .collect()
    }

    /// List out projects that account ID is admin for.
    pub fn get_admin_projects(&self, account_id: AccountId) -> HashSet<AccountId> {
        self.projects
            .into_iter()
            .filter_map(|(entity_id, project)| {
                (entity_id == &account_id || Project::from(project).is_admin(&account_id))
                    .then_some(entity_id.clone())
            })
            .collect()
    }

    /// List single project details.
    pub fn get_project(&self, account_id: AccountId) -> Project {
        self.projects
            .get(&account_id)
            .expect("ERR_NO_ENTITY")
            .into()
    }

    /// List project founders.
    pub fn get_founders(&self, account_id: AccountId) -> HashSet<AccountId> {
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY")).founders
    }

    /// List project team.
    pub fn get_team(&self, account_id: AccountId) -> HashSet<AccountId> {
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY"))
            .application
            .expect("ERR_NO_APPLICATION")
            .team
            .keys()
            .cloned()
            .collect()
    }

    /// Check if account ID is an project.
    pub fn check_is_project(&self, account_id: AccountId) -> bool {
        self.projects.contains_key(&account_id)
    }

    /// Check if given account ID is manager or higher for given project.
    pub fn check_is_project_admin(&self, project_id: &AccountId, account_id: &AccountId) -> bool {
        let Some(versioned_project) = self.projects.get(project_id) else {
            return false;
        };
        let project: Project = versioned_project.into();
        project.is_admin(account_id)
    }

    /// Assertions

    /// Check whether the given account ID can edit the project with the given ID.
    pub(super) fn assert_can_edit_project(&self, project_id: &AccountId, account_id: &AccountId) {
        require!(
            self.check_is_project_admin(project_id, account_id) || self.check_is_owner(account_id),
            "ERR_NO_PERMISSION"
        );
    }
}
