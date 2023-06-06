#!/bin/bash
set -e

ACCOUNT_ID=$1

./build.sh

NEAR_ENV=mainnet near deploy $ACCOUNT_ID ./res/horizon.wasm -f
