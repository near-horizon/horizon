use std::str::FromStr;

use std::collections::{HashMap, HashSet};

use base64::Engine as _;
use clap::Parser;
use tokio::sync::mpsc;
use tracing::info;

use near_lake_framework::near_indexer_primitives::{
    self, IndexerChunkView, IndexerExecutionOutcomeWithReceipt, IndexerShard,
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
    eprintln!("listen_blocks");
    // This will be a map of correspondence between transactions and receipts
    let mut tx_receipt_ids = HashMap::<String, String>::new();
    // This will be a list of receipt ids we're following
    let mut wanted_receipt_ids = HashSet::<String>::new();
    let engine = base64::engine::general_purpose::STANDARD;

    // Boilerplate code to listen the stream
    while let Some(streamer_message) = stream.recv().await {
        eprintln!("Block height: {}", streamer_message.block.header.height);
        for shard in streamer_message.shards {
            process_shard(
                shard,
                &mut tx_receipt_ids,
                &mut wanted_receipt_ids,
                &engine,
                &watching_list,
            );
        }
    }
}

fn process_shard(
    shard: IndexerShard,
    tx_receipt_ids: &mut HashMap<String, String>,
    wanted_receipt_ids: &mut HashSet<String>,
    engine: &base64::engine::GeneralPurpose,
    watching_list: &[near_indexer_primitives::types::AccountId],
) {
    let Some(chunk) =  shard.chunk else {
        return;
    };

    let receipts = get_receipts_and_hashes(&chunk, watching_list);

    // add `converted_into_receipt_id` to the list of receipt ids we are interested in
    wanted_receipt_ids.extend(receipts.iter().map(|(receipt_id, _)| receipt_id.clone()));

    // add key value pair of transaction hash and in which receipt id it was converted for further lookup
    tx_receipt_ids.extend(receipts);

    for execution_outcome in shard.receipt_execution_outcomes {
        process_outcome(
            execution_outcome,
            wanted_receipt_ids,
            tx_receipt_ids,
            engine,
        );
    }
}

fn get_receipts_and_hashes(
    chunk: &IndexerChunkView,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> Vec<(String, String)> {
    chunk
        .transactions
        .iter()
        // Check if transaction receiver id is one of the list we are interested in
        .filter(|transaction| is_tx_receiver_watched(transaction, watching_list))
        .map(|transaction| {
            (
                // extract receipt_id transaction was converted into
                transaction
                    .outcome
                    .execution_outcome
                    .outcome
                    .receipt_ids
                    .first()
                    .expect("`receipt_ids` must contain one Receipt Id")
                    .to_string(),
                transaction.transaction.hash.to_string(),
            )
        })
        .collect()
}

fn process_outcome(
    execution_outcome: IndexerExecutionOutcomeWithReceipt,
    wanted_receipt_ids: &mut HashSet<String>,
    tx_receipt_ids: &mut HashMap<String, String>,
    engine: &base64::engine::GeneralPurpose,
) {
    let Some(receipt_id) = wanted_receipt_ids.take(&execution_outcome.receipt.receipt_id.to_string()) else {
        return;
    };
    // log the tx because we've found it
    info!(
        target: "indexer_example",
        "Transaction hash {:?} related to {} executed with status {:?}",
        tx_receipt_ids.get(receipt_id.as_str()),
        &execution_outcome.receipt.receiver_id,
        execution_outcome.execution_outcome.outcome.status
    );

    if let near_indexer_primitives::views::ReceiptEnumView::Action {
        signer_id, actions, ..
    } = execution_outcome.receipt.receipt
    {
        eprintln!("{}", signer_id);

        for action in actions {
            let near_indexer_primitives::views::ActionView::FunctionCall { args, .. } = action else {
                eprintln!("Not a function call");
                continue;
            };
            let decoded_args = engine.decode(args.clone()).unwrap_or({
                eprintln!("Can't decode args, possibly already decoded");
                args
            });
            let Ok(args_json) = serde_json::from_slice::<serde_json::Value>(&decoded_args) else {
                eprintln!("Can't parse args");
                continue;
            };
            eprintln!("{args_json:#?}");
        }
    }
    // remove tx from hashmap
    tx_receipt_ids.remove(receipt_id.as_str());
}

fn is_tx_receiver_watched(
    tx: &near_indexer_primitives::IndexerTransactionWithOutcome,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> bool {
    watching_list.contains(&tx.transaction.receiver_id)
}
