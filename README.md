# NEAR Contribute

This smart contract serves as an extension to SocialDB to maintain the entity <> contributor relations.
One can relate this to the LinkedIn graph of employment in Web2.

## Project structure

This repository contains multiple key directories, namely:

- **contract:** this is where the smart contract code lives
- **seed:** this is a script for ingesting seed data into the deployed smart contract
- **widgets:** this is where the front-end/BOS widget code lives

## Specification

The `Entity` is the core object, that augments the information in `SocialDB` with the specific context
that this AccountId represents an entity.

`EntityKind` represents what kind of entity this is:
 - Project - A Web3 project, that can exist independently of legal organizations
 - Organization - A legal organization
 - DAO - Something between a project and an organization, managed by people

Methods:

| Function | Description | Permissions |
| - | - | - |
| `set_moderator(moderator_id: AccountId)` | Sets new moderator account | Moderator |
| `set_entity(account_id: AccountId, entity: Entity)` | Sets full information about entity for given account | Moderator |
| `add_entity(account_id: AccountId, kind: EntityKind, start_date: Timestamp)` | Add new entity of given kind (project, DAO, organization) and start date. Automatically adds the creator as contributor will full permissions to edit | Anyone |
| `admin_add_entity(account_id: AccountId, founder_id: AccountId, name: String, kind: EntityKind, start_date: Timestamp)` | Adds a new entity like the previous function, but instead of using the predecessor account as founder, uses `founder_id` | Moderator |
| `get_entities(from: Option<U64>, limit: Option<U64>)` | Fetches all the entities from the state. (Optionaly paginates if params given) | Anyone |
| `get_entity(account_id: AccountId)` | Gets details about a specific entity with a given account ID | Anyone |
| `get_admin_entities(account_id: AccountId)` | Fetches all the entities that a given account ID is admin of | Anyone |
| `check_is_entity(account_id: AccountId)` | Checks if the given account ID has a entity registered to it | Anyone |
| `invite_contributor(entity_id: AccountId, contributor_id: AccountId, description: String, contribution_type: ContributionType, start_date: U64, permissions: HashSet<Permission>)` | Invites a contributor to a entity | Permission::Manager or above |
| `accept_invite(account_id: AccountId)` | Accept the invite for contributing to entity with given account ID | Contributor who the invite is sent to |
| `reject_invite(account_id: AccountId)` | Reject the invite for contributing to entity with given account ID | Contributor who the invite is sent to |
| `get_entity_invites(account_id: AccountId)` | Fetches all the invites sent by the entity with given account ID | Anyone |
| `get_contributor_invites(account_id: AccountId)` | Fetches all the invites sent to the contributor with given account ID | Anyone |
| `get_invite(entity_id: AccountId, contributor_id: AccountId)` | Gets details about a specific invite with a given entity and contributor IDs | Anyone |
| `request_contribution(entity_id: AccountId, description: String)` | Request to contribute to given entity. | Anyone |
| `register(contribution_types: HashSet<ContributionType>, skills: HashSet<String>, resume: String)` | Register as a contributor using the provided details | Anyone |
| `edit_contributor(contributor: Contributor)` | Edit your contributor profile with all the details | Anyone |
| `get_contributors()` | Fetch all the contributors stored in the state | Anyone |
| `check_is_contributor(account_id: AccountId)` | Check if the given account ID is registered as a contributor | Anyone |
| `get_contributor(account_id: AccountId)` | Get the details of a contributor with the given account ID | Anyone |
| `get_contribution_types()` | List out all the contribution types available in the contract | Anyone |
| `post_contribution_need(entity_id: AccountId, description: String, contribution_type: ContributionType)` | Create a new need for given entity with a description and type | Permission::Manager or above |
| `set_contribution_need(entity_id: AccountId, cid: String, need: ContributionNeed)` | Update a need for given entity | Permission::Manager or above |
| `get_contribution_needs()` | Fetch all contribution needs | Anyone |
| `get_entity_contribution_needs(account_id: AccountId)` | Fetch all contribution needs from the given entity | Anyone |
| `get_admin_contribution_needs(account_id: AccountId)` | Fetch all contribution needs the given account can manage | Anyone |
| `get_contribution_need(account_id: AccountId, cid: String)` | Get the details about the given need | Anyone |
| `check_if_need_proposed(account_id: AccountId, cid: String)` | Check if the given need has a proposal from the predecessor account | Anyone |
| `request_contribution(entity_id: AccountId, description: String, contribution_type: ContributionType, need: Option<String>)` | Propose a contribution to a entity as a contributor | Anyone |
| `accept_contribution(entity_id: AccountId, contributor_id: AccountId, description: Option<String>, start_date: Option<U64>)` | Accept a contribution proposal/request. (Optionaly update description and start date) | Permission::Manager or above |
| `reject_contribution(entity_id: AccountId, contributor_id: AccountId)` | Reject a contribution proposal/request | Permission::Manager or above |
| `finish_contribution(entity_id: AccountId, contributor_id: AccountId, end_date: U64)` | Mark a contribution as ended and add a end date | Permission::Manager or above |
| `get_conrtibutor_contributions(account_id: AccountId)` | Fetch all the contributions this contributor is participating in | Anyone |
| `get_entity_contributions(account_id: AccountId)` | Fetch all the contributions this entity is participating in | Anyone |
| `get_need_contributions(account_id: AccountId, cid: String)` | Fetch all contributions for the given need | Anyone |
| `get_contribution(entity_id: AccountId, contributor_id: AccountId)` | Get the details about the given contribution | Anyone |
| `get_entity_contribution_requests(account_id: AccountId)` | Fetch all the contribution requests | Anyone |
| `get_contributor_contribution_requests(account_id: AccountId)` | Get the details about the given request | Anyone |
| `get_admin_contribution_requests(account_id: AccountId)` | Fetch all the contribution requests the given account can manage | Anyone |
| `get_need_contribution_requests(account_id: AccountId, cid: String)` | Fetch all contribution requests for the given need | Anyone |
| `get_conrtibution_request(entity_id: AccountId, contributor_id: AccountId)` | Get the details about the given request | Anyone |
