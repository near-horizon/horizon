#!/bin/bash
set -e

RUSTFLAGS='-C link-arg=-s' cargo build -p token --target wasm32-unknown-unknown --release
[[ ! -d "res" ]] && mkdir res
cp target/wasm32-unknown-unknown/release/token.wasm ./res/

