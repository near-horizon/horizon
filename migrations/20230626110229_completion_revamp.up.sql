-- Add up migration script here
DROP INDEX IF EXISTS projects_completion_idx;

ALTER TABLE projects
DROP COLUMN completion,
ADD COLUMN completion double precision NOT NULL GENERATED ALWAYS AS (
  (
    CASE WHEN length(name) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(description) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(image::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(tagline) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(website) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(lintree::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(vertical::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN array_length(product_type, 1) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(integration) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(dev) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(distribution) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(stage) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(company_size) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(location) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(problem) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(success_position) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(why) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(vision) > 0 THEN 1 ELSE 0 END
  ) / 18.0
) STORED;

CREATE INDEX projects_completion_idx ON projects (completion);
