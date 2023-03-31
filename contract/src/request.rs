use std::collections::HashSet;

use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, near_bindgen, require,
    serde::{Deserialize, Serialize},
    serde_json, AccountId, Timestamp,
};
use near_sdk_contract_tools::standard::nep297::Event;

use crate::{events::Events, Contract, ContractExt};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Eq, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum PaymentSource {
    Credits,
    Other,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde", rename_all = "camelCase")]
pub struct Request {
    project_id: AccountId,
    title: String,
    description: String,
    tags: HashSet<String>,
    source: PaymentSource,
    #[serde(with = "crate::dec_serde::u64_dec_format")]
    deadline: Timestamp,
    budget: u128,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum VersionedRequest {
    V0(Request),
}

impl From<VersionedRequest> for Request {
    fn from(value: VersionedRequest) -> Self {
        match value {
            VersionedRequest::V0(r) => r,
        }
    }
}

impl From<&VersionedRequest> for Request {
    fn from(value: &VersionedRequest) -> Self {
        match value {
            VersionedRequest::V0(r) => r.clone(),
        }
    }
}

#[near_bindgen]
impl Contract {
    /// Add new request for given project.
    pub fn add_request(&mut self, request: Request) {
        self.assert_admin(&request.project_id, &env::predecessor_account_id());
        let cid = crate::create_cid(&serde_json::to_string(&request).unwrap());
        let key = (request.project_id.clone(), cid.clone());
        self.requests
            .insert(key.clone(), VersionedRequest::V0(request));
        Events::AddRequest {
            account_id: key.0,
            cid: key.1,
        }
        .emit();
    }

    /// Edit existing request.
    pub fn edit_request(&mut self, cid: String, request: Request) {
        self.assert_admin(&request.project_id, &env::predecessor_account_id());
        let key = (request.project_id.clone(), cid.clone());
        require!(self.requests.contains_key(&key), "ERR_NO_REQUEST");
        self.requests
            .insert(key.clone(), VersionedRequest::V0(request));
        Events::EditRequest {
            account_id: key.0,
            cid: key.1,
        }
        .emit();
    }

    /// Remove request with given CID.
    pub fn remove_request(&mut self, cid: String, account_id: AccountId) {
        self.assert_admin(&account_id, &env::predecessor_account_id());
        let key = (account_id.clone(), cid.clone());
        self.requests.remove(&key);
        Events::RemoveRequest { account_id, cid }.emit();
    }

    /// Views

    /// List out requests. By default list all of them.
    pub fn get_requests(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> HashSet<(AccountId, String)> {
        let from_index = from_index.unwrap_or(0) as usize;
        let limit = limit.unwrap_or(self.projects.len().into()) as usize;
        self.requests
            .keys()
            .skip(from_index)
            .take(limit)
            .cloned()
            .collect()
    }

    /// Get request details.
    pub fn get_request(&self, cid: &str, account_id: &AccountId) -> Request {
        self.requests
            .get(&(account_id.clone(), cid.to_string()))
            .expect("ERR_NO_REQUEST")
            .into()
    }

    /// Get requests for which given account ID has admin or higher permissions.
    pub fn get_admin_requests(&self, account_id: AccountId) -> HashSet<(AccountId, String)> {
        self.requests
            .keys()
            .filter(|(project_id, _)| self.check_is_project_admin(project_id, &account_id))
            .cloned()
            .collect()
    }

    pub(super) fn assert_is_request(&self, cid: &str, account_id: &AccountId) {
        require!(
            self.requests
                .contains_key(&(account_id.clone(), cid.to_string())),
            "ERR_NOT_REQUEST"
        );
    }
}

