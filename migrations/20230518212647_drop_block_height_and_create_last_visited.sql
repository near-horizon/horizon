-- Add migration script here
DROP TABLE block_height;

CREATE TABLE last_visited (
  id int PRIMARY KEY,
  height bigint NOT NULL
);

INSERT INTO last_visited (id, height) VALUES (1, 89711997);

