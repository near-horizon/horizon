-- Add down migration script here
DROP INDEX IF EXISTS projects_product_type_idx;

CREATE INDEX projects_product_type_idx ON projects (product_type);

ALTER TABLE projects
DROP COLUMN product_type
ADD COLUMN product_type text NOT NULL DEFAULT '';
