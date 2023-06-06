-- Add migration script here
DROP INDEX vendors_credits_idx;
DROP INDEX vendors_balance_idx;
ALTER TABLE vendors
  DROP COLUMN credits,
  DROP COLUMN balance;

DROP INDEX projects_credits_idx;
DROP INDEX projects_balance_idx;
ALTER TABLE projects 
  DROP COLUMN credits,
  DROP COLUMN balance;
