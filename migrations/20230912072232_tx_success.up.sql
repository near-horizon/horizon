-- Add up migration script here
ALTER TABLE
  transactions
ADD
  COLUMN success BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS transactions_success_idx ON transactions (success);
