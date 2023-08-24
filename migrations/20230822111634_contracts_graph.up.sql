-- Add up migration script here
ALTER TABLE
  projects
ADD
  COLUMN contracts varchar(64) [] NOT NULL DEFAULT array [] :: varchar(64) [];
