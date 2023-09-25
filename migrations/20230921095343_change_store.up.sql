-- Add up migration script here
CREATE TABLE IF NOT EXISTS changes (
  account_id varchar(64) PRIMARY KEY,
  email varchar(255) NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  image jsonb NOT NULL,
  website text NOT NULL,
  tagline text NOT NULL,
  linktree jsonb NOT NULL,
  vertical jsonb NOT NULL,
  stage text NOT NULL,
  userbase integer NOT NULL,
  distribution text DEFAULT '' :: text NOT NULL,
  dev text DEFAULT '' :: text NOT NULL,
  product_type text [] DEFAULT '{}' :: text [] NOT NULL,
  company_size integer DEFAULT 0 NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS changes_account_id_email_idx ON changes (account_id, email);
