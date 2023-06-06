-- Add migration script here
DROP INDEX investors_completion_idx;
ALTER TABLE investors DROP COLUMN completion;

DROP INDEX vendors_completion_idx;
ALTER TABLE vendors DROP COLUMN completion;

ALTER TABLE projects ALTER COLUMN completion DROP NOT NULL;
