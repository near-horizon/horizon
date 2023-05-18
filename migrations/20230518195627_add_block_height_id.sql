-- Add migration script here
ALTER TABLE block_height ADD COLUMN hash char(44) PRIMARY KEY;
