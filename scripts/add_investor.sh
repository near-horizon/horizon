#!/bin/bash
set -e

ACCOUNT_ID=$1
CONTRACT_ID=$2
SIGNER_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID add_investors "{\"investors\":{\"$ACCOUNT_ID\":{\"contact\":\"$ACCOUNT_ID\",\"permissions\":{\"$ACCOUNT_ID\":[\"Admin\"]},\"verified\":true}}}" --accountId $SIGNER_ID
