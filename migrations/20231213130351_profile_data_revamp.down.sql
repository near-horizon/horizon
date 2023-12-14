-- Add down migration script here
DROP INDEX IF EXISTS profiles_value_idx;

DROP TABLE IF EXISTS profiles;
