#!/bin/bash
set -e

RUSTFLAGS='-C link-arg=-s' cargo build -p horizon --target wasm32-unknown-unknown --release
[[ ! -d "res" ]] && mkdir res
cp target/wasm32-unknown-unknown/release/horizon.wasm ./res/

