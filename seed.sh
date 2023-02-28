#!/bin/bash
set -e

export DATA_PATH="$1"
export KEY_PATH="$2"
export RECEIVER_ID="$3"

cargo run -p seed

unset DATA_PATH
unset KEY_PATH
unset RECEIVER_ID
