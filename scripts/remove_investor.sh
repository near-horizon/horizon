#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
ACCOUNT_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID remove_investors "{\"investors\":[\"$ACCOUNT_ID\"]}" --accountId $SIGNER_ID
