-- Add up migration script here
CREATE TABLE IF NOT EXISTS profiles (
  id VARCHAR(64) PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}' :: JSONB
);

CREATE INDEX IF NOT EXISTS profiles_value_idx ON profiles USING GIN (value);
