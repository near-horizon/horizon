# Horizon

This monorepo contains all the services and code that make up the Horizon product.

## Directory structure

Each of the directories in this repository will have its own README file, so for
more detailed explanations of the directory go to its README.

- **[aggregator](./aggregator)** - This directory contains the source code which
  aggregates and ingests data from chain into our database
- **[airtable-sync](./airtable-sync)** - This directory contains the source code
  which updates the tables in airtable for manual processing
- **[api](./api)** - This directory contains the main backend for fetching the data
  stored in our database
- **[app](./app)** - This directory contains the frontend code for the Horizon
  website
- **[backup](./backup)** - This directory contains the source code for dumping
  the data from our database into an AWS S3 bucket
- **[contract](./contract)** - This directory contains the main smart contract
  that powers the interactions and logic behind the product
- **[data](./data)** - This directory contains the static assets that are to be
  used in the frontend content places (tooltips, etc.)
- **[indexer](./indexer)** - This directory contains the source code for our
  indexer which listens to all function calls sent to our smart contract and
  captures them in our database
- **[migrations](./migrations)** - This directory contains all our database
  migration scripts
- **[scripts](./scripts)** - This directory contains a collection of utility
  scripts used for more convenient development
- **[time-metrics](./time-metrics)** - This directory contains the source code
  for capturing metrics we track for a given time period on each day
- **[bos-components](./bos-components)** - This directory contains the source code
  for the frontend of the product which consists of [BOS components](https://docs.near.org/bos)
- **root directory (/)** - This directory contains everything listed above
  as well as some individual files, namely:
  - **[build.sh](./build.sh)** - This script builds the smart contract for production
    and copies the build output into the res folder
  - **[dev_deploy.sh](./dev_deploy.sh)** - This script builds the smart contract
    and deploys it to a provided account without invoking any additional
    function calls
  - **[dev_bos_deploy.sh](./dev_bos_deploy.sh)** - This script substitutes
    variables (like contract account ID and the API URL) for the provided
    alternatives and deploys the bos components to the social contract on mainnet
  - **[dirty_deploy.sh](./dirty_deploy.sh)** - This script builds the smart
    contract, deploys a state cleaner smart contract (`state_cleanup.wasm`) and
    cleans up all the state the smart contract has had, then deploys the newly
    built smart contract (mostly used to recover from broken state on the staging
    environment from a bad contract upgrade or migration)
  - **[indexer_run.sh](./indexer_run.sh)** - This script runs the indexer like
    you would in a dev environment

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

## Contributing

### Tools

In order to work on this repository there are a few tools you will need,
depending on which part of the repository you want to work on:

- API, aggregator, airtable-sync, indexer:
  - [Rust](https://www.rust-lang.org/) - should be installed with
    [rustup](https://rustup.rs/) - using the latest stable release is encouraged
- contract, token:
  - [Rust](https://www.rust-lang.org/) + WASM target - should be installed like
    above but using rust version 1.69 until this
    [issue](https://github.com/near/nearcore/issues/9143) gets resolved. You can
    add the WASM target buy running the following command:

```shell
rustup target add wasm32-unknown-unknown
```

- BOS components:
  - [Node.js](https://nodejs.org/en) - can be installed any way you want (
    personal recommendation is to use [rtx-cli](https://github.com/jdxcode/rtx)
    ) - using the latest stable version is encouraged
  - [bos-cli](https://github.com/bos-cli-rs/bos-cli-rs) - can be installed by
    following the instructions in the tool
    [repository](https://github.com/bos-cli-rs/bos-cli-rs#install) (only if
    intending to deploy the components)
  - [bos-loader](https://github.com/near/bos-loader) - can be installed by
    following the instructions in the tool
    [repository](https://github.com/near/bos-loader/releases) (if you want
    to preview the changes locally before deploying the components)

#### Environment management

As mentioned earlier, there are two environments other than the local environment
on your machine:

- Staging environment - lives on `contribut3.near` and has it's separate indexer,
  aggegator and API/database but doesn't have any syncs or backup jobs
- Production environment - lives on `nearhorizon.near` and has all the projects
  deployed and running

The usual process for developing features/updates is to test everything locally,
create a PR for that feature and deploy the contract and bos components to the
staging account (if they were affected by that particular PR).
When the changes are tested by other team members on the staging environment,
we can merge the PR and deploy the changes to the production account.

**_Note_**: Keep in mind that the changes to the `indexer`, `aggregator`,
`airtable-sync`, `api` and `app` are all handled automatically by the platform
service providers (e.g. Render and Vercel).

#### Platforms

The 2 platforms that are currently used for deploying projects are [Render.com](https://render.com)
and the [BOS](https://near.org).

Currently the following projects live on Render.com:

- Database
- Database backup
- API
- Indexer
- Aggregator
- Airtable sync

Whereas the contract and bos components live on the BOS (either as on chain
smart contract or on chain stored code for components).

The website which is in the works will potentialy live on Vercel.

**_Note_**: The projects which are currently on Render.com are manually created
with plans to migrate that into a blueprint deployment - having the infrastructure
documented as part of the repository.

### Guidelines

When working with the Rust source code, each file should be formatted using
the default `rustfmt` by running

```shell
cargo fmt
```

You should also run `clippy` and fix any warnings that might show up, a good
start is to run:

```shell
cargo clippy --fix
```

to clean up any auto-fixable warnings and errors and move on from there by
manually addressing any warnings/errors.

When working with the source code for components, you should run the following
commands to get everything set up:

```shell
pnpm i
```

to install all the dependencies,

```shell
pnpm prepare
```

in case the prepare script doesn't run after the install script (this will
install `bos-loader` and `bos-cli` using `cargo` and set up `husky` for
running the pre-commit hooks).

Make sure all files are properly formatted by running

```shell
pnpm format
```

but if you have installed the `husky` hooks, this should be done for you on
each commit.

**_Tip_**: _When working with the component files, open up the
[types.d.ts](./bos-components/types.d.ts) file first as this will load in the type
definitions of the environment you are working with (BOS APIs)._
