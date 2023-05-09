use std::collections::HashSet;

use near_sdk::AccountId;
use near_sdk_contract_tools::event;

#[event(standard = "horizon", version = "1", serde = "near_sdk::serde")]
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
    VerifyProject {
        account_id: AccountId,
    },
    SubmitApplication {
        account_id: AccountId,
    },
    ApproveApplication {
        account_id: AccountId,
    },
    RejectApplication {
        account_id: AccountId,
        reason: String,
    },
    AddVendor {
        account_id: AccountId,
    },
    RegisterVendor {
        account_id: AccountId,
    },
    EditVendor {
        account_id: AccountId,
    },
    RemoveVendor {
        account_id: AccountId,
    },
    VerifyVendor {
        account_id: AccountId,
    },
    AddRequest {
        account_id: AccountId,
        cid: String,
    },
    EditRequest {
        account_id: AccountId,
        cid: String,
    },
    RemoveRequest {
        account_id: AccountId,
        cid: String,
    },
    AddProposal {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    EditProposal {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    RemoveProposal {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    RejectProposal {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    AddInvestors {
        investors: HashSet<AccountId>,
    },
    RegisterInvestor {
        account_id: AccountId,
    },
    RemoveInvestors {
        investors: HashSet<AccountId>,
    },
    EditInvestors {
        investors: HashSet<AccountId>,
    },
    VerifyInvestor {
        account_id: AccountId,
    },
    AddContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    AcceptContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    RejectContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    RemoveContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    AddContributionAction {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
        description: String,
    },
    DeliverContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    CompleteContribution {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
    },
    GiveVendorFeedback {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
        feedback: String,
    },
    GiveProjectFeedback {
        project_id: AccountId,
        vendor_id: AccountId,
        cid: String,
        feedback: String,
    },
    AddClaim {
        project_id: AccountId,
        account_id: AccountId,
        message: String,
    },
    AcceptClaim {
        project_id: AccountId,
        account_id: AccountId,
    },
    RejectClaim {
        project_id: AccountId,
        account_id: AccountId,
    },
}
