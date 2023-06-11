# Horizon

This smart contract serves as an extension to SocialDB to maintain the entity <> contributor relations.
One can relate this to the LinkedIn graph of employment in Web2.

## Project structure

This repository contains multiple key directories, namely:

- **contract:** this is where the smart contract code lives
- **seed:** this is a script for ingesting seed data into the deployed smart contract
- **widgets:** this is where the front-end/BOS widget code lives
- **api:** this is a service that handles encrypting and decrypting sensitive data
- **awesome-near-fetcher:** this is a script that fetches data from the AwesomeNEAR API

## Specification

The `Project`, `Vendor` and `Investor` are the core objects, that augment the information in `SocialDB` with the specific context
that this AccountId represents in `Horizon`.
