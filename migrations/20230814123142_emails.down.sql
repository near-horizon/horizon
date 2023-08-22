-- Add down migration script here
DROP INDEX projects_email;

ALTER TABLE
  projects DROP COLUMN email;
