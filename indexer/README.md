# Indexer

The indexer listens to each block that gets stored in the Lake S3 bucket,
by using the [near-lake-framework](https://docs.rs/near-lake-framework),
and reacts to only function calls sent to the Horizon smart contract.

Here is the flow outline of how this happens:

1. A new block is read from the S3 bucket
2. For each shard in the block, iterate over the transactions and filter
   out the transaction hash and receipt ID if the transaction receiver
   ID is of interest - [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/lib.rs#L12)
3. Collect those receipt IDs and transaction hashes in a `HashMap` -
   [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/main.rs#L77)
4. Filter out the current block's receipts based on the map of receipt IDs
   and transaction hashes, and get their `ExecutionOutcome`s with the same
   transaction hashes - [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/lib.rs#L46)
5. Process each outcome in order to extract all actions that are of
   interest and format them in the correct struct -
   [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/lib.rs#L67)
6. Store the collected actions in our database -
   [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/store.rs#L36)
7. Store the last visited block height -
   [source](https://github.com/near-horizon/horizon/blob/e12792353682e14acaa8bb21227d1a6cc7f48f2e/indexer/src/main.rs#L91)

**NOTE**: Keep track of the migration to [0.8.0](https://github.com/near/near-lake-framework-rs/issues/52).
