-- Add migration script here
CREATE INDEX IF NOT EXISTS timestamp_index ON transactions (timestamp);
