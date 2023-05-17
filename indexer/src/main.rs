use std::str::FromStr;

use std::collections::HashMap;

use base64::Engine as _;
use clap::Parser;
use itertools::Itertools;
use near_lake_framework::near_indexer_primitives::views::BlockView;
use tokio::sync::mpsc;
use tracing::info;

use near_lake_framework::near_indexer_primitives::{
    self, CryptoHash, IndexerExecutionOutcomeWithReceipt, StreamerMessage,
};
use near_lake_framework::LakeConfig;

use configs::{init_logging, Opts};

mod configs;

/// Assuming we want to watch for transactions where a receiver account id is one of the provided in a list
/// We pass the list of account ids (or contracts it is the same) via argument ``--accounts``
/// We want to catch all *successfull* transactions sent to one of the accounts from the list.
/// In the demo we'll just look for them and log them but it might and probably should be extended based on your needs.

#[tokio::main]
async fn main() -> Result<(), tokio::io::Error> {
    init_logging();

    let opts: Opts = Opts::parse();

    let config: LakeConfig = opts.clone().into();

    let (_, stream) = near_lake_framework::streamer(config);

    let watching_list = opts
        .accounts
        .split(',')
        .map(|elem| {
            near_indexer_primitives::types::AccountId::from_str(elem).expect("AccountId is invalid")
        })
        .collect();

    listen_blocks(stream, watching_list).await;

    Ok(())
}

/// The main listener function the will be reading the stream of blocks `StreamerMessage`
/// and perform necessary checks
async fn listen_blocks(
    mut stream: mpsc::Receiver<near_indexer_primitives::StreamerMessage>,
    watching_list: Vec<near_indexer_primitives::types::AccountId>,
) {
    // This will be a map of correspondence between transactions and receipts
    let mut tx_receipt_ids = HashMap::new();
    // This will be a list of receipt ids we're following
    let engine = base64::engine::general_purpose::STANDARD;

    // Boilerplate code to listen the stream
    while let Some(streamer_message) = stream.recv().await {
        tx_receipt_ids.extend(collect_transactions(&streamer_message, &watching_list));
        for (outcome, tx_hash) in filter_outcomes(&streamer_message, &mut tx_receipt_ids) {
            process_outcome(outcome, tx_hash, &engine, &streamer_message.block);
        }
    }
}

fn collect_transactions(
    message: &StreamerMessage,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> HashMap<CryptoHash, CryptoHash> {
    message
        .shards
        .iter()
        .flat_map(|shard| {
            let Some(chunk) = shard.chunk.as_ref() else {
                return vec![];
            };
            chunk
                .transactions
                .iter()
                .filter_map(|transaction| {
                    is_tx_receiver_watched(&transaction, watching_list).then(|| {
                        (
                            transaction
                                .outcome
                                .execution_outcome
                                .outcome
                                .receipt_ids
                                .first()
                                .expect("`receipt_ids` must contain one Receipt Id")
                                .clone(),
                            transaction.transaction.hash.clone(),
                        )
                    })
                })
                .collect()
        })
        .collect()
}

fn filter_outcomes(
    message: &StreamerMessage,
    tx_receipt_ids: &mut HashMap<CryptoHash, CryptoHash>,
) -> Vec<(IndexerExecutionOutcomeWithReceipt, CryptoHash)> {
    message
        .shards
        .iter()
        .flat_map(|shard| {
            shard
                .receipt_execution_outcomes
                .iter()
                .filter_map(|outcome| {
                    tx_receipt_ids
                        .remove(&outcome.receipt.receipt_id)
                        .map(|tx_hash| (outcome.clone(), tx_hash))
                })
                .collect_vec()
        })
        .collect()
}

fn process_outcome(
    execution_outcome: IndexerExecutionOutcomeWithReceipt,
    tx_hash: CryptoHash,
    engine: &base64::engine::GeneralPurpose,
    block: &BlockView,
) {
    if let near_indexer_primitives::views::ReceiptEnumView::Action {
        signer_id, actions, ..
    } = execution_outcome.receipt.receipt
    {
        eprintln!("{}", signer_id);

        for (action, log) in actions
            .into_iter()
            .zip(execution_outcome.execution_outcome.outcome.logs)
        {
            let near_indexer_primitives::views::ActionView::FunctionCall { args, method_name, .. } = action else {
                eprintln!("Not a function call");
                continue;
            };
            let decoded_args = engine.decode(args.clone()).unwrap_or({
                info!("Can't decode args, possibly already decoded");
                args
            });
            let Ok(args_json) = serde_json::from_slice::<serde_json::Value>(&decoded_args) else {
                eprintln!("Can't parse args");
                continue;
            };
            eprintln!("block_hash: {}", block.header.hash);
            eprintln!("timestamp: {}", block.header.timestamp);
            eprintln!("tx_hash: {tx_hash}");
            eprintln!("method_name: {method_name}");
            eprintln!("{args_json:#?}");
            eprintln!("log: {log:?}",);
        }
    }
}

fn is_tx_receiver_watched(
    tx: &near_indexer_primitives::IndexerTransactionWithOutcome,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> bool {
    watching_list.contains(&tx.transaction.receiver_id)
}
