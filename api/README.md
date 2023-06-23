# API

This directory contains the source code for the main off-chain backend
of Horizon.

The API is written in Rust using the [axum](https://docs.rs/axum) framework
and [SQLx](https://docs.rs/sqlx) as the database query engine.

## File structure

- [main.rs](./src/main.rs) - Here is where the app gets bootstraped and ran
  and where the connection with the database gets established
- [lib.rs](./src/lib.rs) - The top level library file which contains module
  declarations and some helpers used throughout the rest of the library code
- [auth.rs](./src/auth.rs) - This file contains the authentication, authorization
  and encryption/decryption logic which is not yet utilized due to missing
  functionality from the BOS[^1] so it can be skipped over for now
- [routes](./src/routes/) - This is the directory where all the routes of the
  server live, most files export a [axum Router](https://docs.rs/axum/latest/axum/struct.Router.html)
  which gets nested in the top level router for completing the app router
  - [mod.rs](./src/routes/mod.rs) - The main router export which contains all the
    nested sub-routers
  - [atlas.rs](./src/routes/atlas.rs) - The router which handles fetching data from
    the atlas endpoints for easier consumption from the front-end
  - [encrypt.rs](./src/routes/encrypt.rs) and
    [decrypt.rs](./src/routes/decrypt.rs) - These files are planned to be used
    for secure on chain storing of sensitive data but can be ignored for now as,
    like mentioned above, there is missing support for performing authentication
    with third party servers on BOS[^1]
  - [transactions.rs](./src/routes/transactions.rs) - This file contians routes
    for fetching data on the indexed[^2] transactions and some basic stats
  - [data](./src/routes/data/) - This directory is used for more complex listing,
    searching, filtering and credit handling for all the entities in Horizon
    - [mod.rs](./src/routes/data/mod.rs) - This file contains some minor helpers
      and exports the routers for each entity including the credits system
    - [credits.rs](./src/routes/data/credits.rs) - Currently, this router only
      contains data fetching routes and no data mutation routes as this is still
      being worked on. The routes it does contain are simple credit balance checks,
      listing out any credit applications and listing out credit transfers per
      given project/vendor
    - [claims.rs](./src/routes/data/claims.rs) - Only contains a single endpoint
      for listing out claims, can be filtered based on status, time and a query
      string, has pagination and sorting
    - [investors.rs](./src/routes/data/investors.rs) - Contains two routes, one
      for listing out investors with filters, queries with pagination and sorting
      and one for listing investor profile completion
    - [projects.rs](./src/routes/data/projects.rs) - Contains two routes, one
      for listing out projects with filters, queries with pagination and sorting
      and one for listing project profile completion
    - [requests.rs](./src/routes/data/requests.rs) - Only contains a single endpoint
      for listing out requests, can be filtered based on request properties, a query
      string and has pagination and sorting
    - [vendors.rs](./src/routes/data/vendors.rs) - Contains two routes, one
      for listing out vendors with filters, queries with pagination and sorting
      and one for listing vendor profile completion

[^1]:
    The user could be able to authenticate with a third party server by logging
    in to that server separately from the BOS login, but that is very unintuitive and
    bad UX. The best way this could be handled is by components being able to sign
    messages for users using their wallets (like in [NEP0413](https://github.com/near/NEPs/blob/4886221074103d82c421555379c56d5cc1f7567b/neps/nep-0413.md))
    , and then sending the signed message (which should include the latest block hash)
    to this (or any other) server to authenticate the user and perform any required
    actions thereafter (similar to how the NEAR Protocol JSON RPC works itself)

[^2]:
    More information on the data that is being indexed can be found in the
    [indexer directory](../indexer)
