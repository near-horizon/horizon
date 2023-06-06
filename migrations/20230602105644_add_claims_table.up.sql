-- Add migration script here
CREATE TABLE claims (
  project_id varchar(64) NOT NULL,
  account_id varchar(64) NOT NULL,
  claim jsonb NOT NULL,
  PRIMARY KEY (project_id, account_id),
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE NO ACTION
);
CREATE INDEX claims_project_id_idx ON claims (project_id);
CREATE INDEX claims_account_id_idx ON claims (account_id);
CREATE INDEX claims_claim_idx ON claims USING GIN (claim);
