#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
PROJECT_ID=$3
VENDOR_ID=$4
CID=$5

NEAR_ENV=mainnet near call $CONTRACT_ID remove_contribution "{\"project_id\":\"$PROJECT_ID\",\"vendor_id\":\"$VENDOR_ID\",\"cid\":\"$CID\"}" --accountId $SIGNER_ID
