use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::serde_json::{self, Value};
use near_sdk::{assert_one_yocto, env, near_bindgen, require, AccountId, Timestamp};
use near_sdk_contract_tools::owner::Owner;
use near_sdk_contract_tools::standard::nep297::Event;
use std::collections::{HashMap, HashSet};

use crate::dec_serde::u64_dec_format;
use crate::events::Events;
use crate::incentives::Incentive;
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
pub struct ProjectV2 {
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

impl ProjectV2 {
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        self.founders.contains(account_id)
            || self.team.get(account_id).map_or(false, |permissions| {
                permissions.contains(&Permission::Admin)
            })
    }

    pub fn completion(&self) -> (u8, u8) {
        let completion_array = [
            self.integration.is_empty(),
            self.geo.is_empty(),
            self.problem.is_empty(),
            self.success_position.is_empty(),
            self.why.is_empty(),
            self.vision.is_empty(),
        ];
        (
            completion_array.iter().filter(|&x| !x).count() as u8,
            completion_array.len() as u8,
        )
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

#[derive(BorshSerialize, BorshDeserialize, Deserialize, Serialize, Clone, Default, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Project {
    #[serde(flatten)]
    pub project: ProjectV2,
    pub contracts: HashSet<AccountId>,
    pub credit_balance: u64,
    pub achieved_incentives: HashMap<Incentive, u8>,
}

impl Project {
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        self.project.is_admin(account_id)
    }

    pub fn completion(&self) -> (u8, u8) {
        let (completion, total) = self.project.completion();
        (
            completion + if self.contracts.is_empty() { 0 } else { 1 },
            total + 1,
        )
    }

    pub fn patch(&mut self, value: &Value) {
        self.project.patch(value);
        let project = value.as_object().expect("ERR_INVALID_PROJECT");
        if let Some(contracts) = project.get("contracts") {
            self.contracts = HashSet::from_iter(
                contracts
                    .as_array()
                    .expect("ERR_INVALID_CONTRACTS")
                    .iter()
                    .map(|v| serde_json::from_value(v.clone()).expect("ERR_INVALID_CONTRACTS")),
            );
        }
    }
}

// #[derive(Serialize, Deserialize, Clone, Default, Debug)]
// #[serde(crate = "near_sdk::serde")]
// #[serde(rename_all = "camelCase")]
// pub struct Nft {
//     contract_id: String,
//     token_id: String,
// }
//
// #[derive(Serialize, Deserialize, Clone, Debug, Default)]
// #[serde(crate = "near_sdk::serde")]
// #[serde(untagged)]
// pub enum Image {
//     Img {
//         img: String,
//     },
//     Url {
//         url: String,
//     },
//     Ipfs {
//         ipfs_cid: String,
//     },
//     Nft {
//         nft: Nft,
//     },
//     #[default]
//     None,
// }
//
// #[derive(Deserialize, Serialize, Clone, Default, Debug)]
// #[serde(crate = "near_sdk::serde")]
// struct SocialProfile {
//     #[serde(default)]
//     pub name: String,
//     #[serde(default)]
//     pub description: String,
//     #[serde(default)]
//     pub image: Image,
//     #[serde(default)]
//     pub tagline: String,
//     #[serde(default)]
//     pub website: String,
//     #[serde(default)]
//     pub linktree: HashMap<String, String>,
//     #[serde(default)]
//     pub verticals: HashMap<String, String>,
//     #[serde(default)]
//     pub product_type: HashMap<String, String>,
//     #[serde(default)]
//     pub category: String,
//     #[serde(default)]
//     pub stage: String,
//     #[serde(default)]
//     pub distribution: String,
//     #[serde(default)]
//     pub dev: String,
//     #[serde(default)]
//     pub team: String,
// }
//
// impl SocialProfile {
//     pub fn completion(&self) -> (u8, u8) {
//         let completion_array = [
//             self.name.is_empty(),
//             self.description.is_empty(),
//             matches!(self.image, Image::None),
//             self.tagline.is_empty(),
//             self.website.is_empty(),
//             self.linktree.is_empty(),
//             self.verticals.is_empty() || self.category.is_empty(),
//             self.product_type.is_empty(),
//             self.stage.is_empty(),
//             self.distribution.is_empty(),
//             self.dev.is_empty(),
//             self.team.is_empty(),
//         ];
//         (
//             completion_array.iter().filter(|&v| !v).count() as u8,
//             completion_array.len() as u8,
//         )
//     }
// }
//
// #[derive(Deserialize, Serialize, Clone, Default, Debug)]
// #[serde(crate = "near_sdk::serde")]
// struct SocialMetadata {
//     pub profile: SocialProfile,
// }
//
// #[derive(Deserialize, Serialize, Clone, Default, Debug)]
// #[serde(crate = "near_sdk::serde")]
// struct SocialData {
//     #[serde(flatten)]
//     pub accounts: HashMap<AccountId, SocialMetadata>,
// }
//
// #[derive(Deserialize, Serialize, Clone, Default, Debug)]
// #[serde(crate = "near_sdk::serde")]
// struct SocialArgs {
//     pub keys: Vec<String>,
// }

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum VersionedProject {
    V2(ProjectV2),
    V1(OldProject),
    V3(Project),
}

impl VersionedProject {
    pub fn is_v1(&self) -> bool {
        matches!(self, VersionedProject::V1(_))
    }
}

impl Default for VersionedProject {
    fn default() -> Self {
        Self::V3(Project {
            contracts: HashSet::new(),
            credit_balance: 0,
            achieved_incentives: HashMap::new(),
            project: ProjectV2 {
                founders: HashSet::new(),
                application: ApplicationStatus::NotSubmitted,
                team: HashMap::new(),
                verified: false,
                credits: false,
                ..Default::default()
            },
        })
    }
}

impl From<OldProject> for ProjectV2 {
    fn from(value: OldProject) -> Self {
        Self {
            credits: false,
            founders: value.founders,
            team: value.team,
            why: value.why,
            integration: value.integration,
            success_position: value.success_position,
            problem: value.problem,
            vision: value.vision,
            deck: value.deck,
            white_paper: value.white_paper,
            roadmap: value.roadmap,
            team_deck: value.team_deck,
            demo: value.demo,
            tam: value.tam,
            geo: value.geo,
            verified: value.verified,
            application: value.application,
        }
    }
}

impl From<ProjectV2> for Project {
    fn from(value: ProjectV2) -> Self {
        Self {
            project: value,
            contracts: HashSet::new(),
            achieved_incentives: HashMap::new(),
            credit_balance: 0,
        }
    }
}

impl From<VersionedProject> for ProjectV2 {
    fn from(value: VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => o.into(),
            VersionedProject::V2(e) => e,
            VersionedProject::V3(e) => e.project,
        }
    }
}

impl From<&VersionedProject> for ProjectV2 {
    fn from(value: &VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => o.clone().into(),
            VersionedProject::V2(e) => e.clone(),
            VersionedProject::V3(e) => e.project.clone(),
        }
    }
}

impl From<VersionedProject> for Project {
    fn from(value: VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => ProjectV2::from(o).into(),
            VersionedProject::V2(e) => e.into(),
            VersionedProject::V3(e) => e,
        }
    }
}

impl From<&VersionedProject> for Project {
    fn from(value: &VersionedProject) -> Self {
        match value {
            VersionedProject::V1(o) => ProjectV2::from(o.clone()).into(),
            VersionedProject::V2(e) => e.clone().into(),
            VersionedProject::V3(e) => e.clone(),
        }
    }
}

impl VersionedProject {
    pub fn new(founders: HashSet<AccountId>) -> Self {
        Self::V3(Project {
            project: ProjectV2 {
                founders,
                ..Default::default()
            },
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
                *existing = VersionedProject::V3(old);
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
                old.project.verified = true;
                *existing = VersionedProject::V3(old);
            });
        Events::VerifyProject { account_id }.emit();
    }

    /// Add founders to project.
    pub fn add_founders(&mut self, account_id: AccountId, founders: Vec<AccountId>) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            old.project.founders.extend(founders);
            *existing = VersionedProject::V3(old);
        });
    }

    /// Remove founders from project.
    pub fn remove_founders(&mut self, account_id: AccountId, founders: Vec<AccountId>) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            for founder in founders {
                old.project.founders.remove(&founder);
            }
            *existing = VersionedProject::V3(old);
        });
    }

    /// Add team members to project or edit existing team members' permissions.
    pub fn add_team(&mut self, account_id: AccountId, team: Permissions) {
        self.assert_can_edit_project(&account_id, &env::predecessor_account_id());
        self.projects.entry(account_id).and_modify(|existing| {
            let mut old: Project = existing.clone().into();
            for (account_id, permissions) in team {
                old.project.team.insert(account_id, permissions);
            }
            *existing = VersionedProject::V3(old);
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
                old.project.team.remove(&account_id);
            }
            *existing = VersionedProject::V3(old);
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
            project.project.application =
                ApplicationStatus::Submitted(near_sdk::env::block_timestamp());
            *old = VersionedProject::V3(project);
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
            matches!(project.project.application, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.project.application = ApplicationStatus::Accepted;
            project.project.credits = true;
            *old = VersionedProject::V3(project);
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
            matches!(project.project.application, ApplicationStatus::Submitted(_)),
            "ERR_APPLICATION_NOT_SUBMITTED"
        );
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.project.application = ApplicationStatus::Rejected(reason.clone());
            *old = VersionedProject::V3(project);
        });
        Events::RejectApplication { account_id, reason }.emit();
    }

    /// Enable a project to utilize credits.
    pub fn enable_credits(&mut self, account_id: AccountId, note: Option<String>) {
        self.assert_owner();
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.project.credits = true;
            *old = VersionedProject::V3(project);
        });
        Events::EnableCredits { account_id, note }.emit();
    }

    /// Disable a project from utilizing credits.
    pub fn disable_credits(&mut self, account_id: AccountId, note: Option<String>) {
        self.assert_owner();
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            project.project.credits = false;
            *old = VersionedProject::V3(project);
        });
        Events::DisableCredits { account_id, note }.emit();
    }

    /// Add credits to a project.
    pub fn add_credits(&mut self, account_id: AccountId, amount: u64, note: Option<String>) {
        self.assert_owner();
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            require!(project.project.credits, "ERR_CREDITS_NOT_ENABLED");
            project.project.credits = true;
            project.credit_balance += amount;
            *old = VersionedProject::V3(project);
        });
        Events::AddCredits {
            account_id,
            amount,
            note,
        }
        .emit();
    }

    /// Remove credits from a project.
    pub fn remove_credits(&mut self, account_id: AccountId, amount: u64, note: Option<String>) {
        self.assert_owner();
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            require!(project.project.credits, "ERR_CREDITS_NOT_ENABLED");
            require!(amount <= project.credit_balance, "ERR_NOT_ENOUGH_CREDITS");
            project.credit_balance -= amount;
            *old = VersionedProject::V3(project);
        });
        Events::RemoveCredits {
            account_id,
            amount,
            note,
        }
        .emit();
    }

    /// Spend credits from a project.
    pub fn spend_credits(&mut self, account_id: AccountId, amount: u64, note: Option<String>) {
        self.assert_admin(&account_id, &env::predecessor_account_id());
        let is_owner = self.check_is_owner(&env::predecessor_account_id());
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            require!(
                project.project.credits || is_owner,
                "ERR_CREDITS_NOT_ENABLED"
            );
            require!(amount <= project.credit_balance, "ERR_NOT_ENOUGH_CREDITS");
            project.credit_balance -= amount;
            *old = VersionedProject::V3(project);
        });
        Events::SpendCredits {
            account_id,
            amount,
            note,
        }
        .emit();
    }

    /// Add incentive.
    pub fn add_incentive(
        &mut self,
        account_id: AccountId,
        incentive: Incentive,
        note: Option<String>,
    ) {
        self.assert_owner();
        let mut credits_accrued = false;
        self.projects.entry(account_id.clone()).and_modify(|old| {
            let mut project: Project = old.clone().into();
            // require!(project.project.credits, "ERR_CREDITS_NOT_ENABLED");
            let achieved = project
                .achieved_incentives
                .entry(incentive.clone())
                .or_default();
            if let Some(credits) = incentive.produce_incentive(*achieved > 0) {
                project.credit_balance += credits;
                credits_accrued = true;
            }
            *achieved += 1;
            *old = VersionedProject::V3(project);
        });
        if credits_accrued {
            Events::AchieveIncentive {
                account_id,
                incentive,
                note,
            }
            .emit();
        }
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
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY"))
            .project
            .founders
    }

    /// List project team.
    pub fn get_team(&self, account_id: AccountId) -> Permissions {
        Project::from(self.projects.get(&account_id).expect("ERR_NO_ENTITY"))
            .project
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
        project_id == account_id || project.is_admin(account_id)
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
