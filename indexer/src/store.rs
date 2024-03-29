use near_lake_framework::near_indexer_primitives::{types::AccountId, CryptoHash};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Transaction {
    pub hash: CryptoHash,
    pub signer_id: AccountId,
    pub method_name: String,
    pub args: serde_json::Value,
    pub log: String,
    pub block_hash: CryptoHash,
    pub timestamp: u64,
    pub success: bool,
}

impl Transaction {
    pub fn new(
        hash: CryptoHash,
        signer_id: AccountId,
        method_name: String,
        args: serde_json::Value,
        log: String,
        block_hash: CryptoHash,
        timestamp: u64,
        success: bool,
    ) -> Self {
        Self {
            hash,
            signer_id,
            method_name,
            args,
            log,
            block_hash,
            timestamp,
            success,
        }
    }

    pub async fn insert(&self, pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
        eprintln!("Inserting transaction: {self:#?}");

        sqlx::query!(
            r#"
            INSERT INTO
              transactions (
                hash,
                signer_id,
                method_name,
                args,
                log,
                block_hash,
                timestamp,
                success
              )
            VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8)
            "#,
            self.hash.to_string(),
            self.signer_id.to_string(),
            self.method_name,
            self.args,
            self.log,
            self.block_hash.to_string(),
            self.timestamp as i64,
            self.success,
        )
        .execute(pool)
        .await?;

        eprintln!("Transaction inserted");

        Ok(())
    }
}
