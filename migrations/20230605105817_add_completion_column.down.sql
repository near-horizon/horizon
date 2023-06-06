-- Add migration script here
DROP INDEX projects_completion_idx;
ALTER TABLE projects DROP COLUMN completion;
