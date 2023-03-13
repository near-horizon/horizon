use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::store::LookupSet;
use near_sdk::{assert_one_yocto, env, require};
use near_sdk::{near_bindgen, AccountId};
use near_sdk_contract_tools::owner::OwnerExternal;
use near_sdk_contract_tools::standard::nep141::{
    Nep141, Nep141Controller, Nep141Hook, Nep141Transfer,
};
use near_sdk_contract_tools::{owner::Owner, FungibleToken, Owner};

#[derive(BorshDeserialize, BorshSerialize)]
enum VersionedAllowList {
    V0(AccountId),
}

impl From<AccountId> for VersionedAllowList {
    fn from(value: AccountId) -> Self {
        Self::V0(value)
    }
}

impl From<VersionedAllowList> for AccountId {
    fn from(value: VersionedAllowList) -> Self {
        match value {
            VersionedAllowList::V0(account_id) => account_id,
        }
    }
}

#[derive(Owner, FungibleToken)]
#[fungible_token(name = "NEAR Horizon", symbol = "HZN", decimals = 24)]
#[near_bindgen]
pub struct Contract {
    allowlist: LookupSet<VersionedAllowList>,
    fund_amount: u128,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner_id: AccountId, total_supply: U128, fund_amount: U128) -> Self {
        let mut contract = Self {
            allowlist: LookupSet::new(b"a"),
            fund_amount: fund_amount.into(),
        };

        Owner::init(&mut contract, &owner_id);
        contract.allowlist.insert(owner_id.clone().into());
        contract.deposit_unchecked(&owner_id, total_supply.into());

        contract
    }

    #[payable]
    pub fn add_deposit(&mut self, deposit: U128) {
        self.assert_owner();
        assert_one_yocto();
        self.deposit_unchecked(&self.own_get_owner().unwrap(), deposit.into());
    }

    #[payable]
    pub fn register_holder(&mut self, account_id: AccountId) {
        self.assert_owner();
        assert_one_yocto();
        self.allowlist.insert(account_id.into());
    }

    #[payable]
    pub fn claim_credits(&mut self) {
        assert_one_yocto();
        let claimer = env::predecessor_account_id();

        self.transfer(
            claimer.clone(),
            self.own_get_owner().unwrap(),
            self.ft_balance_of(claimer).into(),
            Some("Claiming credits".to_string()),
        );
    }

    #[payable]
    pub fn fund_program_participant(&mut self, account_id: AccountId) {
        self.assert_owner();
        assert_one_yocto();
        self.allowlist.insert(account_id.clone().into());
        self.transfer(
            self.own_get_owner().unwrap(),
            account_id,
            self.fund_amount,
            Some("Awarding credits to program participant".to_string()),
        );
    }
}

impl Nep141Hook for Contract {
    fn before_transfer(&mut self, transfer: &Nep141Transfer) {
        require!(
            self.allowlist
                .contains(&transfer.receiver_id.clone().into()),
            "ERR_RECEIVER_NOT_REGISTERED"
        )
    }

    fn after_transfer(&mut self, _transfer: &Nep141Transfer, _state: ()) {}
}

#[cfg(test)]
mod tests {
    use near_sdk::{test_utils::VMContextBuilder, testing_env};
    use near_sdk_contract_tools::{owner::OwnerExternal, standard::nep141::Nep141};

    use super::*;

    #[test]
    fn test_init() {
        let bob: AccountId = "bob.near".parse().unwrap();
        let total_supply = 1_000_000;
        let contract = Contract::new(bob.clone(), total_supply.into(), 50_000.into());

        assert_eq!(contract.own_get_owner(), Some(bob));
        assert_eq!(contract.ft_total_supply(), total_supply.into());
    }

    #[test]
    fn test_add_deposit() {
        let bob: AccountId = "bob.near".parse().unwrap();
        let total_supply = 1_000_000;
        let mut contract = Contract::new(bob.clone(), total_supply.into(), 50_000.into());

        assert_eq!(contract.own_get_owner(), Some(bob.clone()));
        assert_eq!(contract.ft_total_supply(), total_supply.into());
        assert_eq!(contract.ft_balance_of(bob.clone()), total_supply.into());

        let additional_deposit = 10;
        let context = VMContextBuilder::new()
            .predecessor_account_id(bob.clone())
            .attached_deposit(1)
            .build();

        testing_env!(context);

        contract.add_deposit(additional_deposit.into());

        assert_eq!(
            contract.ft_total_supply(),
            (total_supply + additional_deposit).into()
        );
        assert_eq!(
            contract.ft_balance_of(bob),
            (total_supply + additional_deposit).into()
        );
    }

    #[test]
    fn test_register_holder() {
        let bob: AccountId = "bob.near".parse().unwrap();
        let alice: AccountId = "alice.near".parse().unwrap();
        let total_supply = 1_000_000;
        let mut contract = Contract::new(bob.clone(), total_supply.into(), 50_000.into());

        let context = VMContextBuilder::new()
            .predecessor_account_id(bob.clone())
            .attached_deposit(1)
            .build();

        testing_env!(context);

        let transfer_amount = 1_000;

        contract.register_holder(alice.clone());
        contract.transfer(bob.clone(), alice.clone(), transfer_amount.into(), None);

        assert_eq!(contract.ft_balance_of(alice), transfer_amount.into());
        assert_eq!(
            contract.ft_balance_of(bob),
            (total_supply - transfer_amount).into()
        );
        assert_eq!(contract.ft_total_supply(), total_supply.into());
    }

    #[test]
    fn test_claim_credits() {
        let bob: AccountId = "bob.near".parse().unwrap();
        let alice: AccountId = "alice.near".parse().unwrap();
        let total_supply = 1_000_000;
        let mut contract = Contract::new(bob.clone(), total_supply.into(), 50_000.into());

        let context = VMContextBuilder::new()
            .predecessor_account_id(bob.clone())
            .attached_deposit(1)
            .build();

        testing_env!(context);

        let transfer_amount = 1_000_u128;

        contract.register_holder(alice.clone());
        contract.transfer(bob.clone(), alice.clone(), transfer_amount.into(), None);

        let context = VMContextBuilder::new()
            .predecessor_account_id(alice.clone())
            .attached_deposit(1)
            .build();

        testing_env!(context);

        contract.claim_credits();

        assert_eq!(contract.ft_balance_of(alice), 0.into());
        assert_eq!(contract.ft_balance_of(bob), total_supply.into());
        assert_eq!(contract.ft_total_supply(), total_supply.into());
    }

    #[test]
    fn test_fund_program_participant() {
        let bob: AccountId = "bob.near".parse().unwrap();
        let alice: AccountId = "alice.near".parse().unwrap();
        let total_supply = 1_000_000;
        let mut contract = Contract::new(bob.clone(), total_supply.into(), 50_000.into());

        let context = VMContextBuilder::new()
            .predecessor_account_id(bob.clone())
            .attached_deposit(1)
            .build();

        testing_env!(context);

        contract.fund_program_participant(alice.clone());

        assert_eq!(contract.ft_balance_of(alice), 50_000.into());
        assert_eq!(contract.ft_balance_of(bob), (total_supply - 50_000).into());
        assert_eq!(contract.ft_total_supply(), total_supply.into());
    }
}
