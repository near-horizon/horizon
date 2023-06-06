-- Add migration script here
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

ALTER TABLE requests
  ALTER COLUMN request_type TYPE RequestType NOT NULL,
  ALTER COLUMN payment_type TYPE PaymentType NOT NULL,
  ALTER COLUMN source TYPE PaymentSource NOT NULL;
ALTER TABLE proposals
  ALTER COLUMN proposal_type TYPE RequestType NOT NULL,
  ALTER COLUMN payment_type TYPE PaymentType NOT NULL,
  ALTER COLUMN payment_source TYPE PaymentSource NOT NULL;

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

ALTER TABLE vendors 
  ALTER COLUMN vendor_type TYPE VendorType NOT NULL,
  ALTER COLUMN payments TYPE Payment[] NOT NULL,
  ALTER COLUMN work TYPE Work[] NOT NULL;
