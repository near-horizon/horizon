-- Add migration script here
ALTER TABLE projects 
  ADD COLUMN credits boolean NOT NULL DEFAULT false,
  ADD COLUMN balance bigint NOT NULL DEFAULT 0;
CREATE INDEX projects_credits_idx ON projects (credits);
CREATE INDEX projects_balance_idx ON projects (balance);

ALTER TABLE vendors
  ADD COLUMN credits boolean NOT NULL DEFAULT false,
  ADD COLUMN balance bigint NOT NULL DEFAULT 0;
CREATE INDEX vendors_credits_idx ON vendors (credits);
CREATE INDEX vendors_balance_idx ON vendors (balance);
