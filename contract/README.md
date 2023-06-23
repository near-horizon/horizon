# Horizon Smart Contract

This directory is the heart of Horizon. The smart contract which represents the
business logic lives here.

The contract is upgradeable by the use of the [`Upgrade` trait](https://docs.rs/near-sdk-contract-tools/latest/near_sdk_contract_tools/derive.Upgrade.html).
The contract also has an owner with help from the [`Owner` trait](https://docs.rs/near-sdk-contract-tools/latest/near_sdk_contract_tools/derive.Owner.html).
All the top level entities are versioned so upgrading a entity struct doesn't
require a state migration in order to keep the contract working, just a contract
deployment.

Each entity and its logic is contained within a separate file and only the common
functionality and functionality unrelated to any entity is contained in the
[lib.rs](./src/lib.rs) file.

## File structure

## Flows
