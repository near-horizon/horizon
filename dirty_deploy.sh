#!/bin/bash
set -e

ACCOUNT_ID=$1
export NEAR_ENV=mainnet

KEYS=$(near view-state $ACCOUNT_ID --finality final | sed -e "s/'/\"/g" | sed -e "s/key/\"key\"/g" | sed -e "s/value/\"value\"/g" | jq '[.[] | .key]' | tr -d '\n' | tr -d '[:blank:]')

near deploy $ACCOUNT_ID ./state_cleanup.wasm
near call $ACCOUNT_ID clean "{\"keys\":$KEYS}" --accountId $ACCOUNT_ID

near deploy $ACCOUNT_ID ./res/near_contribute.wasm

unset NEAR_ENV

