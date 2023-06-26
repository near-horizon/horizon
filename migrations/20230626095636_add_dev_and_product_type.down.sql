-- Add down migration script here
DROP INDEX projects_product_type_idx;

DROP INDEX projects_dev_idx;

ALTER TABLE projects
DROP COLUMN product_type,
DROP COLUMN dev;
