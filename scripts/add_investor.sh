#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
ACCOUNT_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID add_investors "{\"investors\":{\"$ACCOUNT_ID\":{\"contact\":\"$ACCOUNT_ID\",\"permissions\":{\"$ACCOUNT_ID\":[\"Admin\"]},\"verified\":true}}}" --accountId $SIGNER_ID
