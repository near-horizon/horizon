-- Add up migration script here
DROP INDEX IF EXISTS projects_completion_idx;

ALTER TABLE
  projects DROP COLUMN completion,
ADD
  COLUMN completion double precision NOT NULL GENERATED ALWAYS AS (
  (
    (length(name) > 0)::integer +
    (length(description) > 0)::integer +
    (length(image::text) > 2)::integer +
    (length(tagline) > 0)::integer +
    (length(website) > 0)::integer +
    (length(linktree::text) > 2)::integer +
    (length(vertical::text) > 2)::integer +
    (COALESCE(array_length(product_type, 1), 0) > 0)::integer +
    (length(integration) > 0)::integer +
    (length(dev) > 0)::integer +
    (length(distribution) > 0)::integer +
    (length(stage) > 0)::integer +
    (company_size > 0)::integer +
    (length(geo) > 0)::integer +
    (length(problem) > 0)::integer +
    (length(success_position) > 0)::integer +
    (length(why) > 0)::integer +
    (length(vision) > 0)::integer +
    (COALESCE(array_length(contracts, 1), 0) > 0)::integer
  ) / 19.0
) STORED;

CREATE INDEX projects_completion_idx ON projects (completion);
