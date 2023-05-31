-- Add migration script here
-- Projects table
CREATE TABLE projects (
  id varchar(64) PRIMARY KEY,
  founders varchar(64)[] NOT NULL,
  team jsonb NOT NULL,
  why text NOT NULL,
  integration varchar(255) NOT NULL,
  success_position text NOT NULL,
  problem text NOT NULL,
  vision text NOT NULL,
  deck text NOT NULL,
  white_paper text NOT NULL,
  roadmap text NOT NULL,
  team_deck text NOT NULL,
  demo text NOT NULL,
  tam text NOT NULL,
  geo text NOT NULL,
  verified boolean NOT NULL,
  application text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  image jsonb NOT NULL,
  website text NOT NULL,
  tagline text NOT NULL,
  linktree jsonb NOT NULL,
  vertical jsonb NOT NULL,
  stage text NOT NULL,
  userbase integer NOT NULL
);
CREATE INDEX projects_id_idx ON projects (id);
CREATE INDEX projects_name_idx ON projects (name);
CREATE INDEX projects_verified_idx ON projects (verified);
CREATE INDEX projects_vertical_idx ON projects USING GIN (vertical);
CREATE INDEX projects_stage_idx ON projects (stage);
CREATE INDEX projects_userbase_idx ON projects (userbase);
CREATE INDEX projects_founders_idx ON projects USING GIN (founders);
CREATE INDEX projects_team_idx ON projects USING GIN (team);
CREATE INDEX projects_integration_idx ON projects (integration);

-- Vendors table
CREATE TYPE VendorType AS ENUM (
  'Individual',
  'Organization'
);

CREATE TYPE Payment AS ENUM (
  'Fiat',
  'Crypto',
  'Credits'
);

CREATE TYPE Work AS ENUM (
  'OneTime',
  'Short',
  'Long',
  'FullTime'
);

CREATE TABLE vendors (
  id varchar(64) NOT NULL PRIMARY KEY,
  permissions jsonb NOT NULL,
  verified boolean NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  services text NOT NULL,
  tagline text NOT NULL,
  image text NOT NULL,
  website text NOT NULL,
  linktree jsonb NOT NULL,
  active boolean NOT NULL,
  location text NOT NULL,
  vendor_type VendorType NOT NULL,
  payments Payment[] NOT NULL,
  rate integer NOT NULL,
  work Work[] NOT NULL
);
CREATE INDEX vendors_id_idx ON vendors (id);
CREATE INDEX vendors_verified_idx ON vendors (verified);
CREATE INDEX vendors_name_idx ON vendors (name);
CREATE INDEX vendors_services_idx ON vendors (services);
CREATE INDEX vendors_tagline_idx ON vendors (tagline);
CREATE INDEX vendors_description_idx ON vendors (description);
CREATE INDEX vendors_location_idx ON vendors (location);
CREATE INDEX vendors_rate_idx ON vendors (rate);
CREATE INDEX vendors_vendor_type_idx ON vendors (vendor_type);
CREATE INDEX vendors_payments_idx ON vendors USING GIN (payments);
CREATE INDEX vendors_work_idx ON vendors USING GIN (work);

-- Investors table
CREATE TABLE investors (
  id varchar(64) NOT NULL PRIMARY KEY,
  contact text NOT NULL,
  permissions jsonb NOT NULL,
  verified boolean NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  tagline text NOT NULL,
  image jsonb NOT NULL,
  website text NOT NULL,
  linktree jsonb NOT NULL,
  vertical jsonb NOT NULL,
  specialization text NOT NULL,
  location text NOT NULL
);
CREATE INDEX investors_id_idx ON investors (id);
CREATE INDEX investors_verified_idx ON investors (verified);
CREATE INDEX investors_name_idx ON investors (name);
CREATE INDEX investors_tagline_idx ON investors (tagline);
CREATE INDEX investors_description_idx ON investors (description);
CREATE INDEX investors_location_idx ON investors (location);
CREATE INDEX investors_specialization_idx ON investors (specialization);
CREATE INDEX investors_vertical_idx ON investors USING GIN (vertical);

-- Requests table
CREATE TYPE RequestType AS ENUM (
  'OneTime',
  'Short',
  'Long',
  'FullTime'
);

CREATE TYPE PaymentType AS ENUM (
  'FlatRate',
  'TimeBased'
);

CREATE TYPE PaymentSource AS ENUM (
  'Credits',
  'Other'
);

CREATE TABLE requests (
  project_id varchar(64) NOT NULL,
  cid char(59) NOT NULL,
  title varchar(511) NOT NULL,
  description text NOT NULL,
  open boolean NOT NULL,
  request_type RequestType NOT NULL,
  payment_type PaymentType NOT NULL,
  tags varchar(64)[] NOT NULL,
  source PaymentSource NOT NULL,
  deadline bigint NOT NULL,
  budget bigint NOT NULL,
  PRIMARY KEY (project_id, cid),
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE NO ACTION
);
CREATE INDEX requests_cid_idx ON requests (cid);
CREATE INDEX requests_project_id_idx ON requests (project_id);
CREATE INDEX requests_open_idx ON requests (open);
CREATE INDEX requests_request_type_idx ON requests (request_type);
CREATE INDEX requests_payment_type_idx ON requests (payment_type);
CREATE INDEX requests_tags_idx ON requests USING GIN (tags);
CREATE INDEX requests_source_idx ON requests (source);
CREATE INDEX requests_deadline_idx ON requests (deadline);
CREATE INDEX requests_budget_idx ON requests (budget);

-- Proposals table
CREATE TABLE proposals (
  project_id varchar(64) NOT NULL,
  cid char(59) NOT NULL,
  vendor_id varchar(64) NOT NULL,
  title varchar(511) NOT NULL,
  description text NOT NULL,
  start_date bigint NOT NULL,
  end_date bigint NOT NULL,
  price bigint NOT NULL,
  proposal_type RequestType NOT NULL,
  payment_type PaymentType NOT NULL,
  payment_source PaymentSource NOT NULL,
  PRIMARY KEY (project_id, cid, vendor_id),
  FOREIGN KEY (project_id, cid) REFERENCES requests (project_id, cid) ON DELETE NO ACTION,
  FOREIGN KEY (vendor_id) REFERENCES vendors (id) ON DELETE NO ACTION
);
CREATE INDEX proposals_cid_idx ON proposals (cid);
CREATE INDEX proposals_project_id_idx ON proposals (project_id);
CREATE INDEX proposals_vendor_id_idx ON proposals (vendor_id);
CREATE INDEX proposals_title_idx ON proposals (title);
CREATE INDEX proposals_start_date_idx ON proposals (start_date);
CREATE INDEX proposals_end_date_idx ON proposals (end_date);
CREATE INDEX proposals_price_idx ON proposals (price);
CREATE INDEX proposals_proposal_type_idx ON proposals (proposal_type);
CREATE INDEX proposals_payment_type_idx ON proposals (payment_type);
CREATE INDEX proposals_payment_source_idx ON proposals (payment_source);

-- Contributions table
CREATE TABLE contributions (
  project_id varchar(64) NOT NULL,
  cid char(59) NOT NULL,
  vendor_id varchar(64) NOT NULL,
  status jsonb NOT NULL,
  vendor_feedback text,
  project_feedback text,
  price bigint NOT NULL,
  PRIMARY KEY (project_id, cid, vendor_id),
  FOREIGN KEY (project_id, cid, vendor_id) REFERENCES proposals (project_id, cid, vendor_id) ON DELETE NO ACTION
);
CREATE UNIQUE INDEX contributions_cid_project_id_vendor_id_idx ON contributions (cid, project_id, vendor_id);
CREATE INDEX contributions_cid_idx ON contributions (cid);
CREATE INDEX contributions_project_id_idx ON contributions (project_id);
CREATE INDEX contributions_vendor_id_idx ON contributions (vendor_id);
CREATE INDEX contributions_status_idx ON contributions USING GIN (status);
CREATE INDEX contributions_price_idx ON contributions (price);

CREATE TABLE contribution_actions (
  project_id varchar(64) NOT NULL,
  cid char(59) NOT NULL,
  vendor_id varchar(64) NOT NULL,
  description text NOT NULL,
  start_date bigint NOT NULL,
  end_date bigint,
  PRIMARY KEY (project_id, cid, vendor_id),
  FOREIGN KEY (project_id, cid, vendor_id) REFERENCES contributions (project_id, cid, vendor_id) ON DELETE NO ACTION
);
CREATE UNIQUE INDEX contribution_actions_cid_project_id_vendor_id_idx ON contribution_actions (cid, project_id, vendor_id);
CREATE INDEX contribution_actions_cid_idx ON contribution_actions (cid);
CREATE INDEX contribution_actions_project_id_idx ON contribution_actions (project_id);
CREATE INDEX contribution_actions_vendor_id_idx ON contribution_actions (vendor_id);
CREATE INDEX contribution_actions_description_idx ON contribution_actions (description);
CREATE INDEX contribution_actions_start_date_idx ON contribution_actions (start_date);
CREATE INDEX contribution_actions_end_date_idx ON contribution_actions (end_date);
