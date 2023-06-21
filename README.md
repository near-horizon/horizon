# Horizon

This monorepo contains all the services and code that make up the Horizon product.

## Directory structure

- **[aggregator](./aggregator)** - This directory contains the source code which
  aggregates and ingests data from chain into our database
- **[airtable-sync](./airtable-sync)** - This directory contains the source code
  which updates the tables in airtable for manual processing
- **[api](./api)** - This directory contains the main backend for fetching the data
  stored in our database
- **[awesome-near-fetcher](./awesome-near-fetcher)** - This directory contains
  the source code for fetching data from the AwesomeNEAR GraphQL API (**deprecated**)
- **[backup](./backup)** - This directory contains the source code for dumping
  the data from our database into a AWS S3 bucket
- **[contract](./contract)** - This directory contains the main smart contract
  that powers the interactions and logic behind the product
- **[data](./data)** - This directory contains the static assets that are to be
  used in the frontend content places (tooltips ,etc.)
- **[indexer](./indexer)** - This directory contains the source code for our
  indexer which listens to all function calls sent to our smart contract and
  captures them in our database
- **[migrations](./migrations)** - This directory contains all our database
  migration scripts
- **[scripts](./scripts)** - This directory contains a collection of utility
  scripts used for more convenient development
- **[seed](./seed)** - This directory contains the source code for seeding the smart
  contract with initial data (**deprecated**)
- **[token](./token)** - This directory contains the source code for the Horizon
  token that should function as the credit system in the future (**NOTE** not yet
  implemented - credit system is still of-chain)
- **[widgets](./widgets)** - This directory contains the source code for the
  frontend of the product which consists of [BOS components](https://docs.near.org/bos)
- **root directory (/)** - This directory contains everything listed above
  as well as some individual files, namely:
  - **[build.sh](./build.sh)** - This script builds the smart contract for production
    and copies the build output into the res folder
  - **[build_token.sh](./build_token.sh)** - This script builds the token smart
    contract for production and copies the build output into the res folder
  - **[dev_deploy.sh](./dev_deploy.sh)** - This script builds the smart contract
    and deploys it to a provided account without invoking any additional
    function calls
  - **[dev_widget_deploy.sh](./dev_widget_deploy.sh)** - This script substitutes
    variables (like contract account ID and the API URL) for the provided
    alternatives and deploys the widgets to the social contract on mainnet
  - **[dirty_deploy.sh](./dirty_deploy.sh)** - This script builds the smart
    contract, deploys a state cleaner smart contract (`state_cleanup.wasm`) and
    cleans up all the state the smart contract has had, then deploys the newly
    built smart contract (mostly used to recover from broken state on the staging
    environment from a bad contract upgrade or migration)
  - **[indexer_run.sh](./indexer_run.sh)** - This script runs the indexer like
    you would in a dev environment
  - **[seed.sh](./seed.sh)** - This script runs the seed package (**deprecated**)

## Accounts

There are two accounts that have components and contracts deployed to them:

- `nearhorizon.near` - This is the main production environment with real
  data
- `contribut3.near` - This is the staging environment with test data

## Infrastructure

The infrastructure consists of a few building blocks:

- **blockchain** - This is where the smart contracts and components live
- **[Render](https://render.com)** - This is where the API, aggregator,
  indexer, database and cron jobs live
