use std::collections::HashMap;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use near_sdk::serde::{Deserialize, Serialize};

use crate::{Contract, ContractExt};

#[derive(
    BorshSerialize,
    BorshDeserialize,
    Serialize,
    Deserialize,
    PartialEq,
    Eq,
    Clone,
    Debug,
    PartialOrd,
    Ord,
    Hash,
)]
#[serde(crate = "near_sdk::serde")]
pub enum Incentive {
    /// Contract specific

    /// When you first accept a proposal/create a contribution.
    FirstProposalAcceptance,
    ContractCompletion,
    AdditionOfTeamMember,
    ProposalSubmission,

    /// Outside of contract

    /// When you first answer a question.
    QuestionAnswer,
    ProfileCompletion,
    ProfileCompletionHalf,
    ReferalToPlatform,
}

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub enum IncentiveRepetition {
    Once,
    Infinite,
}

impl Incentive {
    pub fn get_incentive(&self) -> u64 {
        use Incentive::*;
        match self {
            FirstProposalAcceptance => 50,
            ContractCompletion => 50,
            AdditionOfTeamMember => 5,
            ProposalSubmission => 25,
            QuestionAnswer => 10,
            ProfileCompletion => 35,
            ProfileCompletionHalf => 10,
            ReferalToPlatform => 20,
        }
    }

    pub fn get_incentive_repetition(&self) -> IncentiveRepetition {
        use Incentive::*;
        match self {
            FirstProposalAcceptance => IncentiveRepetition::Once,
            ContractCompletion => IncentiveRepetition::Once,
            AdditionOfTeamMember => IncentiveRepetition::Once,
            ProposalSubmission => IncentiveRepetition::Once,
            QuestionAnswer => IncentiveRepetition::Once,
            ProfileCompletion => IncentiveRepetition::Once,
            ProfileCompletionHalf => IncentiveRepetition::Once,
            ReferalToPlatform => IncentiveRepetition::Infinite,
        }
    }

    pub fn produce_incentive(&self, captured: bool) -> Option<u64> {
        (self.get_incentive_repetition().is_infinite() || !captured).then_some(self.get_incentive())
    }
}

impl IncentiveRepetition {
    pub fn is_infinite(&self) -> bool {
        use IncentiveRepetition::*;
        match self {
            Once => false,
            Infinite => true,
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_incentive_data() -> HashMap<Incentive, (IncentiveRepetition, u64)> {
        use Incentive::*;
        HashMap::from_iter(
            [
                FirstProposalAcceptance,
                ContractCompletion,
                AdditionOfTeamMember,
                ProposalSubmission,
                QuestionAnswer,
                ProfileCompletion,
                ProfileCompletionHalf,
                ReferalToPlatform,
            ]
            .map(|incentive| {
                (
                    incentive.clone(),
                    (
                        incentive.get_incentive_repetition(),
                        incentive.get_incentive(),
                    ),
                )
            }),
        )
    }
}
