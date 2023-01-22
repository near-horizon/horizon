# NEAR Contribute

This smart contract serves as an extension to SocialDB to maintain the entity <> contributor relations.
One can relate this to the LinkedIn graph of employment in web2.

## Specification

`Entity` is core object, that augments information in `SocialDB` with specific context that this AccountId represents an entity.

`EntityKind` represents what kind of entity this is:
 - Project - web3 project, that can exist independent of legal organizations
 - Organization - legal organization
 - DAO - between project and organization, managed by people

Methods:

| Function | Description | Permissions |
| - | - | - |
| `set_moderator(moderator_id: AccountId` | Sets new moderator account | Moderator |
| `set_entity(account_id: AccountId, entity: Entity)` | Sets full information about entity for given account | Moderator |
| `add_entity(account_id: AccountId, kind: EntityKind, start_date: Timestamp)` | Add new entity of given kind (project, DAO, organization) and start date. Automatically adds the creator as contributor will full permissions to edit | Anyone |
| `request_contribution(entity_id: AccountId, description: String)` | Request to contribute to given entity. | Anyone |
| `approve_contribution(entity_id: AccountId, contributor_id: AccountId, description: Option<String>, start_date: Option<U64>,)` | Approve contribution request. Override details of the contribution and start date if needed. | Permission::Manager or above |
| `finish_contribution(entity_id: AccountId, contributor_id: AccountId, end_date: U64,)` | Finalize contribution, adding stop date | Permission::Manager or above |
