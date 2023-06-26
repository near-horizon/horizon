-- Add down migration script here
DROP INDEX IF EXISTS projects_company_size_idx;

ALTER TABLE projects
DROP COLUMN company_size;
