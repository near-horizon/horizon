#!/bin/bash
set -e

ACCOUNT_ID=$1

./build.sh;

near deploy $ACCOUNT_ID ./res/horizon.wasm
