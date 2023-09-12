-- Add down migration script here
DROP INDEX IF EXISTS transactions_success_idx;

ALTER TABLE
  transactions DROP COLUMN success;
