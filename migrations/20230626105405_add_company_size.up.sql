-- Add up migration script here
ALTER TABLE projects
ADD COLUMN company_size integer NOT NULL DEFAULT 0;

CREATE INDEX projects_company_size_idx ON projects (company_size);
