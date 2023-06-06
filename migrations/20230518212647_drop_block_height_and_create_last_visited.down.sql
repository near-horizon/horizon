-- Add migration script here
DROP TABLE last_visited;

CREATE TABLE block_height (
  height BIGINT NOT NULL,
  hash char(44) PRIMARY KEY
);
