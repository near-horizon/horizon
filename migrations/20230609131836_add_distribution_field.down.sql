-- Add down migration script here
DROP INDEX projects_distribution_idx;
ALTER TABLE projects DROP COLUMN distribution;
