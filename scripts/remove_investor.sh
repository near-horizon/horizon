#!/bin/bash
set -e

ACCOUNT_ID=$1
CONTRACT_ID=$2
SIGNER_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID remove_investors "{\"investors\":[\"$ACCOUNT_ID\"]}" --accountId $SIGNER_ID
