-- Add up migration script here
ALTER TABLE projects ADD COLUMN distribution text NOT NULL DEFAULT ''::text;
CREATE INDEX projects_distribution_idx ON projects (distribution);
