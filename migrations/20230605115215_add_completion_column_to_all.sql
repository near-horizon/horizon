-- Add migration script here
ALTER TABLE projects ALTER COLUMN completion SET NOT NULL;

ALTER TABLE vendors ADD COLUMN completion double precision NOT NULL GENERATED ALWAYS AS (
  (
    CASE WHEN length(permissions::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(name) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(description) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(services) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(tagline) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(image::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(website) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(linktree::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(location) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(vendor_type) > 0 THEN 1 ELSE 0 END +
    CASE WHEN array_length(payments, 1) > 0 THEN 1 ELSE 0 END +
    CASE WHEN rate > 0 THEN 1 ELSE 0 END +
    CASE WHEN array_length(work, 1) > 0 THEN 1 ELSE 0 END
  ) / 13.0
) STORED;
CREATE INDEX vendors_completion_idx ON vendors (completion);

ALTER TABLE investors ADD COLUMN completion double precision NOT NULL GENERATED ALWAYS AS (
  (
    CASE WHEN length(permissions::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(name) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(description) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(tagline) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(image::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(website) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(linktree::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(location) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(vertical::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(specialization) > 0 THEN 1 ELSE 0 END
  ) / 10.0
) STORED;
CREATE INDEX investors_completion_idx ON investors (completion);
