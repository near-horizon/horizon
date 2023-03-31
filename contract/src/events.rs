use std::collections::HashSet;

use near_sdk::AccountId;
use near_sdk_contract_tools::event;

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
    AddInvestors {
        investors: HashSet<AccountId>,
    },
    RemoveInvestors {
        investors: HashSet<AccountId>,
    },
    EditInvestors {
        investors: HashSet<AccountId>,
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
}
