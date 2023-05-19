-- Add migration script here
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  hash char(44) NOT NULL,
  signer_id varchar(64) NOT NULL,
  method_name varchar(256) NOT NULL,
  args jsonb NOT NULL,
  log text NOT NULL,
  block_hash char(44) NOT NULL,
  timestamp bigint NOT NULL
);

CREATE INDEX ON transactions (hash);

INSERT INTO last_visited (id, height) VALUES (1, 86240997) ON CONFLICT (id) DO UPDATE SET height = EXCLUDED.height;
