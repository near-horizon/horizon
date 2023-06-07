use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::serde_json::{self, Value};
use near_sdk::{assert_one_yocto, env, near_bindgen, require, AccountId, Timestamp};
use near_sdk_contract_tools::owner::Owner;
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::dec_serde::u64_dec_format;
use crate::events::Events;
use crate::{Contract, ContractExt};

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
    Default,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Permission {
    #[default]
    Admin,
}

pub type Permissions = HashMap<AccountId, HashSet<Permission>>;

#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default,
)]
#[serde(crate = "near_sdk::serde")]
pub enum ApplicationStatus {
    #[default]
    NotSubmitted,
    Submitted(#[serde(with = "u64_dec_format")] Timestamp),
    Rejected(String),
    Accepted,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone, Default, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct OldProject {
    pub founders: HashSet<AccountId>,
    pub team: Permissions,
    pub why: String,
    pub integration: String,
    pub success_position: String,
    pub problem: String,
    pub vision: String,
    pub deck: String,
    pub white_paper: String,
    pub roadmap: String,
    pub team_deck: String,
    pub demo: String,
    pub tam: String,
    pub geo: String,
    pub verified: bool,
    pub application: ApplicationStatus,
}

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone, Default, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Project {
    pub founders: HashSet<AccountId>,
    pub team: Permissions,
    pub why: String,
    pub integration: String,
    pub success_position: String,
    pub problem: String,
    pub vision: String,
    pub deck: String,
    pub white_paper: String,
    pub roadmap: String,
    pub team_deck: String,
    pub demo: String,
    pub tam: String,
    pub geo: String,
    pub verified: bool,
    pub application: ApplicationStatus,
    pub credits: bool,
}

impl Project {
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        self.founders.contains(account_id)
            || self.team.get(account_id).map_or(false, |permissions| {
                permissions.contains(&Permission::Admin)
            })
    }

    pub fn completion(&self) -> (u8, u8) {
        let mut completed = 0;
        let total = 14;
        if !self.founders.is_empty() {
            completed += 1;
        }
        if !self.team.is_empty() {
            completed += 1;
        }
        if !self.why.is_empty() {
            completed += 1;
        }
        if !self.tam.is_empty() {
            completed += 1;
        }
        if !self.roadmap.is_empty() {
            completed += 1;
        }
        if !self.success_position.is_empty() {
            completed += 1;
        }
        if !self.white_paper.is_empty() {
            completed += 1;
        }
        if !self.integration.is_empty() {
            completed += 1;
        }
        if !self.team_deck.is_empty() {
            completed += 1;
        }
        if !self.problem.is_empty() {
            completed += 1;
        }
        if !self.vision.is_empty() {
            completed += 1;
        }
        if !self.demo.is_empty() {
            completed += 1;
        }
        if !self.geo.is_empty() {
            completed += 1;
        }
        if !self.deck.is_empty() {
            completed += 1;
        }
        (completed, total)
    }

    pub fn patch(&mut self, value: &Value) {
        let project = value.as_object().expect("ERR_INVALID_PROJECT");
        if let Some(founders) = project.get("founders") {
            self.founders = HashSet::from_iter(
                founders
                    .as_array()
                    .expect("ERR_INVALID_FOUNDERS")
                    .iter()
                    .map(|v| serde_json::from_value(v.clone()).expect("ERR_INVALID_FOUNDERS")),
            );
        }
        if let Some(team) = project.get("team") {
            self.team = serde_json::from_value(team.clone()).expect("ERR_INVALID_TEAM");
        }
        if let Some(application) = project.get("application") {
            self.application = serde_json::from_value(application.clone())
                .expect("ERR_INVALID_APPLICATION_STATUS");
        }
        if let Some(why) = project.get("why") {
            self.why = serde_json::from_value(why.clone()).expect("ERR_INVALID_WHY");
        }
        if let Some(integration) = project.get("integration") {
            self.integration =
                serde_json::from_value(integration.clone()).expect("ERR_INVALID_INTEGRATION");
        }
        if let Some(success_position) = project.get("success_position") {
            self.success_position = serde_json::from_value(success_position.clone())
                .expect("ERR_INVALID_SUCCESS_POSITION");
        }
        if let Some(problem) = project.get("problem") {
            self.problem = serde_json::from_value(problem.clone()).expect("ERR_INVALID_PROBLEM");
        }
        if let Some(vision) = project.get("vision") {
            self.vision = serde_json::from_value(vision.clone()).expect("ERR_INVALID_VISION");
        }
        if let Some(deck) = project.get("deck") {
            self.deck = serde_json::from_value(deck.clone()).expect("ERR_INVALID_DECK");
        }
        if let Some(white_paper) = project.get("white_paper") {
            self.white_paper =
                serde_json::from_value(white_paper.clone()).expect("ERR_INVALID_WHITE_PAPER");
        }
        if let Some(roadmap) = project.get("roadmap") {
            self.roadmap = serde_json::from_value(roadmap.clone()).expect("ERR_INVALID_ROADMAP");
        }
        if let Some(team_deck) = project.get("team_deck") {
            self.team_deck =
                serde_json::from_value(team_deck.clone()).expect("ERR_INVALID_TEAM_DECK");
        }
        if let Some(demo) = project.get("demo") {
            self.demo = serde_json::from_value(demo.clone()).expect("ERR_INVALID_DEMO");
        }
        if let Some(tam) = project.get("tam") {
            self.tam = serde_json::from_value(tam.clone()).expect("ERR_INVALID_TAM");
        }
        if let Some(geo) = project.get("geo") {
            self.geo = serde_json::from_value(geo.clone()).expect("ERR_INVALID_GEO");
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedProject {
    V2(Project),
    V1(OldProject),
}

impl VersionedProject {
    pub fn is_v1(&self) -> bool {
        matches!(self, VersionedProject::V1(_))
    }
}

impl Default for VersionedProject {
    fn default() -> Self {
        Self::V2(Project {
            founders: HashSet::new(),
            application: ApplicationStatus::NotSubmitted,
            team: HashMap::new(),
            verified: false,
            credits: false,
            ..Default::default()
        })
    }
}

impl From<VersionedProject> for Project {
    fn from(value: VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => Project {
                credits: false,
                founders: o.founders,
                team: o.team,
                why: o.why,
                integration: o.integration,
                success_position: o.success_position,
                problem: o.problem,
                vision: o.vision,
                deck: o.deck,
                white_paper: o.white_paper,
                roadmap: o.roadmap,
                team_deck: o.team_deck,
                demo: o.demo,
                tam: o.tam,
                geo: o.geo,
                verified: o.verified,
                application: o.application,
            },
            VersionedProject::V2(e) => e,
        }
    }
}

impl From<&VersionedProject> for Project {
    fn from(value: &VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => Project {
                credits: false,
                founders: o.founders.clone(),
                team: o.team.clone(),
                why: o.why.clone(),
                integration: o.integration.clone(),
                success_position: o.success_position.clone(),
                problem: o.problem.clone(),
                vision: o.vision.clone(),
                deck: o.deck.clone(),
                white_paper: o.white_paper.clone(),
                roadmap: o.roadmap.clone(),
                team_deck: o.team_deck.clone(),
                demo: o.demo.clone(),
                tam: o.tam.clone(),
                geo: o.geo.clone(),
                verified: o.verified,
                application: o.application.clone(),
            },
            VersionedProject::V2(e) => e.clone(),
        }
    }
}

impl VersionedProject {
    pub fn new(founders: HashSet<AccountId>) -> Self {
        Self::V2(Project {
            founders,
            ..Default::default()
        })
    }
}

#[near_bindgen]
impl Contract {
    /// Add new project and given user as founding contributor.
    pub fn add_project(&mut self, account_id: AccountId) {
        require!(
            !self.projects.contains_key(&account_id),
            "ERR_PROJECT_EXISTS"
        );
        self.projects.insert(
            account_id.clone(),
            VersionedProject::new(HashSet::from_iter([env::predecessor_account_id()])),
        );
        Events::AddProject { account_id }.emit();
    }

    /// Edit project details.
    pub fn edit_project(&mut self, account_id: AccountId, project: Value) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects
            .entry(account_id.clone())
            .and_modify(|existing| {
                let mut old: Project = existing.clone().into();
                old.patch(&project);
                *existing = VersionedProject::V2(old);
            });
        Events::EditProject { account_id }.emit();
    }

    /// Remove project.
    pub fn remove_project(&mut self, account_id: AccountId) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.remove(&account_id);
        Events::RemoveProject { account_id }.emit();
    }

    pub fn verify_project(&mut self, account_id: AccountId) {
        self.assert_owner();
        self.projects
            .entry(account_id.clone())
            .and_modify(|existing| {
                let mut old: Project = existing.clone().into();
                old.verified = true;
                *existing = VersionedProject::V2(old);
            });
        Events::VerifyProject { account_id }.emit();
    }

    /// Add founders to project.
    pub fn add_founders(&mut self, account_id: AccountId, founders: Vec<AccountId>) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            old.founders.extend(founders);
            *existing = VersionedProject::V2(old);
        });
    }

    /// Remove founders from project.
    pub fn remove_founders(&mut self, account_id: AccountId, founders: Vec<AccountId>) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            for founder in founders {
                old.founders.remove(&founder);
            }
            *existing = VersionedProject::V2(old);
        });
    }

    /// Add team members to project or edit existing team members' permissions.
    pub fn add_team(&mut self, account_id: AccountId, team: Permissions) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            for (account_id, permissions) in team {
                old.team.insert(account_id, permissions);
            }
            *existing = VersionedProject::V2(old);
        });
    }

    /// Remove team members from project.
    pub fn remove_team(
        &mut self,
        account_id: AccountId,
        team: HashMap<AccountId, HashSet<Permission>>,
    ) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            for (account_id, _) in team {
                old.team.remove(&account_id);
            }
            *existing = VersionedProject::V2(old);
        });
    }

    pub fn apply_for_program(&mut self, account_id: AccountId) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            // require!(
            //     project.application.is_some(),
            //     "ERR_APPLICATION_NOT_FILLED_OUT"
            // );
            project.application = ApplicationStatus::Submitted(near_sdk::env::block_timestamp());
            *old = VersionedProject::V2(project);
        });
        Events::SubmitApplication { account_id }.emit();
    }

    #[payable]
    pub fn approve_application(&mut self, account_id: AccountId) {
        self.assert_owner();
        assert_one_yocto();
        let project: Project = self
            .projects
            .get(&account_id)
            .expect("ERR_NOT_PROJECT")
            .into();
        require!(
            matches!(project.application, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.application = ApplicationStatus::Accepted;
            project.credits = true;
            *old = VersionedProject::V2(project);
        });
        Events::ApproveApplication { account_id }.emit();
    }

    // #[private]
    // pub fn approve_application_callback(
    //     &mut self,
    //     account_id: AccountId,
    //     #[callback_result] result: Result<(), near_sdk::PromiseError>,
    // ) {
    //     result.expect("ERR_NOT_FUNDED");
    //     self.projects.entry(account_id.clone()).and_modify(|old| {
    //         let mut project: Project = old.clone().into();
    //         project.application_status = ApplicationStatus::Accepted;
    //         *old = VersionedProject::V0(project);
    //     });
    //     Events::ApproveApplication { account_id }.emit();
    // }

    #[payable]
    pub fn reject_application(&mut self, account_id: AccountId, reason: String) {
        self.assert_owner();
        assert_one_yocto();
        let project: Project = self
            .projects
            .get(&account_id)
            .expect("ERR_NOT_PROJECT")
            .into();
        require!(
            matches!(project.application, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.application = ApplicationStatus::Rejected(reason.clone());
            *old = VersionedProject::V2(project);
        });
        Events::RejectApplication { account_id, reason }.emit();
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
    pub fn get_team(&self, account_id: AccountId) -> Permissions {
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY")).team
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

    pub fn count_v1_projects(&self) -> usize {
        self.projects
            .values()
            .filter(|versioned_project| versioned_project.is_v1())
            .count()
    }

    pub fn get_project_profile_completion(&self, account_id: AccountId) -> (u8, u8) {
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY")).completion()
    }

    /// Assertions

    /// Check whether the given account ID can edit the project with the given ID.
    pub(super) fn assert_can_edit_project(&self, project_id: &AccountId, account_id: &AccountId) {
        require!(
            self.check_is_project_admin(project_id, account_id) || self.check_is_owner(account_id),
            "ERR_NO_PERMISSION"
        );
    }

    #[allow(dead_code)]
    pub(super) fn assert_is_project(&self, account_id: &AccountId) {
        require!(self.check_is_project(account_id.clone()), "ERR_NOT_PROJECT");
    }
}
