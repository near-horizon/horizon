-- Add migration script here
CREATE TABLE transactions (
  hash char(44) PRIMARY KEY,
  signer_id varchar(64) NOT NULL,
  method_name varchar(256) NOT NULL,
  args jsonb NOT NULL,
  log text NOT NULL,
  block_hash char(44) NOT NULL,
  timestamp bigint NOT NULL
);
