use std::str::FromStr;

use std::collections::{HashMap, HashSet};

use base64::Engine as _;
use clap::Parser;
use tokio::sync::mpsc;
use tracing::info;

use near_lake_framework::near_indexer_primitives;
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
    let engine = base64::engine::general_purpose::STANDARD_NO_PAD;

    // Boilerplate code to listen the stream
    while let Some(streamer_message) = stream.recv().await {
        eprintln!("Block height: {}", streamer_message.block.header.height);
        for shard in streamer_message.shards {
            let chunk = if let Some(chunk) = shard.chunk {
                chunk
            } else {
                continue;
            };

            let receipts = chunk
                .transactions
                .iter()
                // Check if transaction receiver id is one of the list we are interested in
                .filter(|transaction| is_tx_receiver_watched(transaction, &watching_list))
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
                .collect::<Vec<_>>();

            // add `converted_into_receipt_id` to the list of receipt ids we are interested in
            wanted_receipt_ids.extend(receipts.iter().map(|(receipt_id, _)| receipt_id.clone()));

            // add key value pair of transaction hash and in which receipt id it was converted for further lookup
            tx_receipt_ids.extend(receipts);

            for execution_outcome in shard.receipt_execution_outcomes {
                if let Some(receipt_id) =
                    wanted_receipt_ids.take(&execution_outcome.receipt.receipt_id.to_string())
                {
                    // log the tx because we've found it
                    info!(
                        target: "indexer_example",
                        "Transaction hash {:?} related to {} executed with status {:?}",
                        tx_receipt_ids.get(receipt_id.as_str()),
                        &execution_outcome.receipt.receiver_id,
                        execution_outcome.execution_outcome.outcome.status
                    );
                    if let near_indexer_primitives::views::ReceiptEnumView::Action {
                        signer_id,
                        ..
                    } = &execution_outcome.receipt.receipt
                    {
                        eprintln!("{}", signer_id);
                    }

                    if let near_indexer_primitives::views::ReceiptEnumView::Action {
                        actions, ..
                    } = execution_outcome.receipt.receipt
                    {
                        actions
                            .iter()
                            .filter_map(|action| match action {
                                near_indexer_primitives::views::ActionView::FunctionCall {
                                    args,
                                    ..
                                } => Some(args.clone()),
                                _ => None,
                            })
                            .filter_map(|args| engine.decode(args).ok())
                            .filter_map(|decoded_args| {
                                serde_json::from_slice::<serde_json::Value>(&decoded_args).ok()
                            })
                            .for_each(|args_json| eprintln!("{args_json:#?}"));
                    }
                    // remove tx from hashmap
                    tx_receipt_ids.remove(receipt_id.as_str());
                }
            }
        }
    }
}

fn is_tx_receiver_watched(
    tx: &near_indexer_primitives::IndexerTransactionWithOutcome,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> bool {
    watching_list.contains(&tx.transaction.receiver_id)
}

