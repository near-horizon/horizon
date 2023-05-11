use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::serde_json::{self, Value};
use near_sdk::{assert_one_yocto, env, ext_contract, near_bindgen, require, AccountId, Timestamp};
use near_sdk_contract_tools::owner::Owner;
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
#[allow(clippy::upper_case_acronyms)]
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

#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default,
)]
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

impl Graduation {
    pub fn patch(&mut self, value: &Value) {
        let Some(graduation) = value.as_object() else {
            return;
        };
        if let Some(pitch_deck) = graduation.get("pitch_deck") {
            self.pitch_deck = pitch_deck
                .as_str()
                .expect("ERR_INVALID_PITCH_DECK")
                .to_string();
        }
        if let Some(white_paper) = graduation.get("white_paper") {
            self.white_paper = white_paper
                .as_str()
                .expect("ERR_INVALID_WHITE_PAPER")
                .to_string();
        }
        if let Some(roadmap) = graduation.get("roadmap") {
            self.roadmap = roadmap.as_str().expect("ERR_INVALID_ROADMAP").to_string();
        }
        if let Some(team) = graduation.get("team") {
            self.team = team.as_str().expect("ERR_INVALID_TEAM").to_string();
        }
        if let Some(tam) = graduation.get("tam") {
            self.tam = tam.as_str().expect("ERR_INVALID_TAM").to_string();
        }
        if let Some(success_metrics) = graduation.get("success_metrics") {
            self.success_metrics = success_metrics
                .as_str()
                .expect("ERR_INVALID_SUCCESS_METRICS")
                .to_string();
        }
        if let Some(demo) = graduation.get("demo") {
            self.demo = demo.as_str().expect("ERR_INVALID_DEMO").to_string();
        }
        if let Some(code) = graduation.get("code") {
            self.code = code.as_str().expect("ERR_INVALID_CODE").to_string();
        }
    }
}

#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default,
)]
#[serde(crate = "near_sdk::serde")]
pub struct PrivateGraduation {
    pub legal: String,
    pub budget: String,
    pub gtm: String,
}

impl PrivateGraduation {
    pub fn patch(&mut self, value: &Value) {
        let Some(graduation) = value.as_object() else {
            return;
        };
        if let Some(legal) = graduation.get("legal") {
            self.legal = legal.as_str().expect("ERR_INVALID_LEGAL").to_string();
        }
        if let Some(budget) = graduation.get("budget") {
            self.budget = budget.as_str().expect("ERR_INVALID_BUDGET").to_string();
        }
        if let Some(gtm) = graduation.get("gtm") {
            self.gtm = gtm.as_str().expect("ERR_INVALID_GTM").to_string();
        }
    }
}

#[derive(
    BorshSerialize, BorshDeserialize, Deserialize, Serialize, PartialEq, Eq, Clone, Debug, Default,
)]
#[serde(crate = "near_sdk::serde")]
pub struct PrivateData {
    pub risks: String,
    pub needs: String,
    pub graduation: PrivateGraduation,
}

impl PrivateData {
    pub fn patch(&mut self, value: &Value) {
        let Some(private_data) = value.as_object() else {
            return;
        };
        if let Some(risks) = private_data.get("risks") {
            self.risks = risks.as_str().expect("ERR_INVALID_RISKS").to_string();
        }
        if let Some(needs) = private_data.get("needs") {
            self.needs = needs.as_str().expect("ERR_INVALID_NEEDS").to_string();
        }
        if let Some(graduation) = private_data.get("graduation") {
            self.graduation.patch(graduation);
        }
    }
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
    pub team: Permissions,
    #[serde(default)]
    pub graduation: Option<Graduation>,
    #[serde(default)]
    pub private: Option<PrivateData>,
}

impl Application {
    pub fn patch(&mut self, value: &Value) {
        let Some(application) = value.as_object() else {
            return;
        };
        if let Some(why) = application.get("why") {
            self.why = serde_json::from_value(why.clone()).expect("ERR_INVALID_WHY");
        }
        if let Some(integration) = application.get("integration") {
            self.integration =
                serde_json::from_value(integration.clone()).expect("ERR_INVALID_INTEGRATION");
        }
        if let Some(success_position) = application.get("success_position") {
            self.success_position = serde_json::from_value(success_position.clone())
                .expect("ERR_INVALID_SUCCESS_POSITION");
        }
        if let Some(partners) = application.get("partners") {
            self.partners = serde_json::from_value(partners.clone()).expect("ERR_INVALID_PARTNERS");
        }
        if let Some(team) = application.get("team") {
            self.team = serde_json::from_value(team.clone()).expect("ERR_INVALID_TEAM");
        }
        if let Some(token) = application.get("token") {
            self.token = serde_json::from_value(token.clone()).expect("ERR_INVALID_TOKEN");
        }
        if let Some(contact) = application.get("contact") {
            if contact.is_null() {
                self.contact = None;
            } else {
                self.contact = Some(contact.as_str().expect("ERR_INVALID_CONTACT").to_string());
            }
        }
        if let Some(geo) = application.get("geo") {
            if geo.is_null() {
                self.geo = None;
            } else {
                self.geo = Some(geo.as_str().expect("ERR_INVALID_GEO").to_string());
            }
        }
        if let Some(vision) = application.get("vision") {
            self.vision = serde_json::from_value(vision.clone()).expect("ERR_INVALID_VISION");
        }
        if let Some(tech_lead) = application.get("tech_lead") {
            self.tech_lead =
                serde_json::from_value(tech_lead.clone()).expect("ERR_INVALID_TECH_LEAD");
        }
        if let Some(graduation) = application.get("graduation") {
            let mut old = self.graduation.clone().unwrap_or_default();
            old.patch(graduation);
            self.graduation = Some(old);
        }
        if let Some(private) = application.get("private") {
            let mut old = self.private.clone().unwrap_or_default();
            old.patch(private);
            self.private = Some(old);
        }
    }
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
        if let Some(application_status) = project.get("application_status") {
            self.application_status = serde_json::from_value(application_status.clone())
                .expect("ERR_INVALID_APPLICATION_STATUS");
        }
        if let Some(graduation_status) = project.get("graduation_status") {
            self.graduation_status = serde_json::from_value(graduation_status.clone())
                .expect("ERR_INVALID_GRADUATION_STATUS");
        }
        if let Some(application) = project.get("application") {
            let mut old_application = self.application.clone().unwrap_or_default();
            old_application.patch(application);
            self.application = Some(old_application);
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

#[ext_contract(token_ext)]
trait Token {
    #[payable]
    fn fund_program_participant(&mut self, account_id: AccountId);
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
                *existing = VersionedProject::V0(old);
            });
        Events::EditProject { account_id }.emit();
    }

    /// Remove project.
    pub fn remove_project(&mut self, account_id: AccountId) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.remove(&account_id);
        Events::RemoveProject { account_id }.emit();
    }

    /// Add founders to project.
    pub fn add_founders(&mut self, account_id: AccountId, founders: Vec<AccountId>) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            old.founders.extend(founders);
            *existing = VersionedProject::V0(old);
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
            *existing = VersionedProject::V0(old);
        });
    }

    /// Add team members to project or edit existing team members' permissions.
    pub fn add_team(&mut self, account_id: AccountId, team: Permissions) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            let mut application = old.application.clone().unwrap_or_default();
            for (account_id, permissions) in team {
                application.team.insert(account_id, permissions);
            }
            old.application = Some(application);
            *existing = VersionedProject::V0(old);
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
            if old.application.is_none() {
                return;
            }
            let mut application = old.application.clone().unwrap();
            for (account_id, _) in team {
                application.team.remove(&account_id);
            }
            old.application = Some(application);
            *existing = VersionedProject::V0(old);
        });
    }

    pub fn apply_for_program(&mut self, account_id: AccountId) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            require!(
                project.application.is_some(),
                "ERR_APPLICATION_NOT_FILLED_OUT"
            );
            project.application_status =
                ApplicationStatus::Submitted(near_sdk::env::block_timestamp());
            *old = VersionedProject::V0(project);
        });
        Events::SubmitApplication { account_id }.emit();
    }

    #[payable]
    pub fn approve_application(&mut self, account_id: AccountId) /*  -> Promise */
    {
        self.assert_owner();
        assert_one_yocto();
        let project: Project = self
            .projects
            .get(&account_id)
            .expect("ERR_NOT_PROJECT")
            .into();
        require!(
            matches!(project.application_status, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        Events::ApproveApplication { account_id }.emit();
        // token_ext::ext(self.credits_account_id.clone())
        //     .with_static_gas(XCC_GAS)
        //     .with_attached_deposit(1)
        //     .fund_program_participant(account_id.clone())
        //     .then(
        //         Self::ext(near_sdk::env::current_account_id())
        //             .with_static_gas(XCC_GAS)
        //             .approve_application_callback(account_id),
        //     )
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
            matches!(project.application_status, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.application_status = ApplicationStatus::Rejected(reason.clone());
            *old = VersionedProject::V0(project);
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
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY"))
            .application
            .unwrap_or_default()
            .team
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

    #[allow(dead_code)]
    pub(super) fn assert_is_project(&self, account_id: &AccountId) {
        require!(self.check_is_project(account_id.clone()), "ERR_NOT_PROJECT");
    }
}
