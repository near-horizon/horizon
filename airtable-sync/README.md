# Airtable Sync

This package performs a simple sync between the data in our database
with the Horizon CRM Airtable.

It fetches all the projects from the database including the fields that
other teams would use in reaching out to those projects and for improving
the platform by making (data) educated decisions for focuses and changes.

The flow is simple:

1. Connect to the database
2. Query all the projects
3. Map the project data to the fields wanted by the CRM users
4. Send the data in batches of 10 to the Airtable with typecasting enabled
   and with the merge field being the project's account ID - [source](https://github.com/near-horizon/horizon/blob/3b3daf5472a0b8b8b4755ff02141cdc548f899aa/airtable-sync/src/main.rs#L59)
