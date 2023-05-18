#!/bin/bash
set -e

export ACCOUNTS=$1

cd indexer;

cargo run --release;

unset ACCOUNTS;

cd ..;
