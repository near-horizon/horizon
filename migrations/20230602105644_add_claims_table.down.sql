-- Add migration script here
DROP INDEX claims_claim_idx;
DROP INDEX claims_account_id_idx;
DROP INDEX claims_project_id_idx;
DROP TABLE claims;
