use std::collections::HashMap;

use base64::Engine as _;
use itertools::Itertools;
use near_lake_framework::near_indexer_primitives::{
    self, views::BlockView, CryptoHash, IndexerExecutionOutcomeWithReceipt, StreamerMessage,
};
use tracing::info;

pub mod store;

pub fn collect_transactions(
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
                    is_tx_receiver_watched(transaction, watching_list).then(|| {
                        (
                            *transaction
                                .outcome
                                .execution_outcome
                                .outcome
                                .receipt_ids
                                .first()
                                .expect("`receipt_ids` must contain one Receipt Id"),
                            transaction.transaction.hash,
                        )
                    })
                })
                .collect()
        })
        .collect()
}

pub fn filter_outcomes(
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

pub fn process_outcome(
    execution_outcome: IndexerExecutionOutcomeWithReceipt,
    tx_hash: CryptoHash,
    engine: &base64::engine::GeneralPurpose,
    block: &BlockView,
) -> Vec<store::Transaction> {
    let near_indexer_primitives::views::ReceiptEnumView::Action {
        signer_id, actions, ..
    } = execution_outcome.receipt.receipt else {
        return vec![];
    };
    let logs = execution_outcome.execution_outcome.outcome.logs;
    let block_hash = block.header.hash;
    let timestamp = block.header.timestamp;

    actions.into_iter().enumerate().filter_map(|(index, action)| {
        let log = logs
            .get(index)
            .map(|log| log.as_str())
            .unwrap_or("No logs for action");
        let near_indexer_primitives::views::ActionView::FunctionCall { args, method_name, .. } = action else {
            eprintln!("Not a function call");
            return None;
        };
        let decoded_args = engine.decode(args.clone()).unwrap_or({
            info!("Can't decode args, possibly already decoded");
            args
        });
        let Ok(args_json) = serde_json::from_slice::<serde_json::Value>(&decoded_args) else {
            eprintln!("Can't parse args");
            return None;
        };
        Some(store::Transaction::new(
            tx_hash,
            signer_id.clone(),
            method_name,
            args_json,
            log.to_string(),
            block_hash,
            timestamp,
        ))
    }).collect()
}

pub fn is_tx_receiver_watched(
    tx: &near_indexer_primitives::IndexerTransactionWithOutcome,
    watching_list: &[near_indexer_primitives::types::AccountId],
) -> bool {
    watching_list.contains(&tx.transaction.receiver_id)
}
