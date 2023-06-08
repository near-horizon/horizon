#!/bin/bash
set -e

ACCOUNT_ID=$1
CONTRACT_ID=$2
SIGNER_ID=$3
CID=$4

NEAR_ENV=mainnet near call $CONTRACT_ID remove_request "{\"account_id\":\"$ACCOUNT_ID\",\"cid\":\"$CID\"}" --accountId $SIGNER_ID
