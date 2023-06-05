-- Add migration script here
ALTER TABLE projects ADD COLUMN completion double precision GENERATED ALWAYS AS (
  (
    CASE WHEN array_length(founders, 1) > 1 THEN 1 ELSE 0 END +
    CASE WHEN length(team::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(why) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(integration) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(success_position) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(problem) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(vision) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(deck) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(white_paper) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(team_deck) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(demo) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(tam) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(geo) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(name) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(description) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(image::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(website) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(tagline) > 0 THEN 1 ELSE 0 END +
    CASE WHEN length(linktree::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(vertical::text) > 2 THEN 1 ELSE 0 END +
    CASE WHEN length(stage) > 0 THEN 1 ELSE 0 END
  ) / 21.0
) STORED;
CREATE INDEX projects_completion_idx ON projects (completion);
