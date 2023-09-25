-- Add down migration script here
DROP INDEX IF EXISTS changes_account_id_email_idxc

DROP TABLE IF EXISTS changes;
