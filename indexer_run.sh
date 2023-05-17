#!/bin/bash
set -e

ACCOUNTS=$1
BLOCK_HEIGHT=$2

cd indexer;

cargo run --release -- --accounts $ACCOUNTS --block-height $BLOCK_HEIGHT mainnet;

cd ..;
