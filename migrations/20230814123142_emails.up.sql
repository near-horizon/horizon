-- Add up migration script here
ALTER TABLE
  projects
ADD
  COLUMN email VARCHAR(255) NOT NULL DEFAULT '';

CREATE INDEX projects_email ON projects (email);
