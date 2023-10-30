-- Add up migration script here
ALTER TABLE
  projects
ADD
  COLUMN backers_digest JSONB NOT NULL DEFAULT '{}' :: JSONB;
