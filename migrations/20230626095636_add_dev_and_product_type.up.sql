-- Add up migration script here
ALTER TABLE projects
ADD COLUMN dev text NOT NULL DEFAULT '',
ADD COLUMN product_type text NOT NULL DEFAULT '';

CREATE INDEX projects_dev_idx ON projects (dev);

CREATE INDEX projects_product_type_idx ON projects (product_type);
