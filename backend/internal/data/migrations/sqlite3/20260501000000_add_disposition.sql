-- +goose Up
ALTER TABLE entities ADD COLUMN disposition VARCHAR(20) NOT NULL DEFAULT 'none';

-- +goose Down
ALTER TABLE entities DROP COLUMN disposition;
