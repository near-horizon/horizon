# NEAR Contribute

This smart contract serves as an extension to SocialDB to maintain the entity <> contributor relations.
One can relate this to the LinkedIn graph of employment in web2.

## Specification

Methods:

| Function | Description | Permissions |
| - | - | - |
| `set_moderator(moderator_id: AccountId` | Sets new moderator account | Moderator |
| `set_entity(account_id: AccountId, entity: Entity)` | Sets full information about entity for given account | Moderator |
| `add_entity(account_id: AccountId, kind: EntityKind, start_date: Timestamp)` | Add new entity of given kind (project, DAO, organization) and start date. Automatically adds the creator as contributor will full permissions to edit | Anyone |
