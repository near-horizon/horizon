-- Add migration script here
ALTER TABLE vendors 
  ALTER COLUMN vendor_type TYPE text,
  ALTER COLUMN payments TYPE text[],
  ALTER COLUMN work TYPE text[];
DROP TYPE IF EXISTS VendorType;
DROP TYPE IF EXISTS Payment;
DROP TYPE IF EXISTS Work;

ALTER TABLE requests
  ALTER COLUMN request_type TYPE text,
  ALTER COLUMN payment_type TYPE text,
  ALTER COLUMN source TYPE text;
ALTER TABLE proposals
  ALTER COLUMN proposal_type TYPE text,
  ALTER COLUMN payment_type TYPE text,
  ALTER COLUMN payment_source TYPE text;
DROP TYPE IF EXISTS RequestType;
DROP TYPE IF EXISTS PaymentType;
DROP TYPE IF EXISTS PaymentSource;
