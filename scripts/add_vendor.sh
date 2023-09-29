#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
ACCOUNT_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID add_vendor "{\"account_id\":\"$ACCOUNT_ID\",\"permissions\":{\"${ACCOUNT_ID}\":[\"Admin\"]}}" --accountId $SIGNER_ID
