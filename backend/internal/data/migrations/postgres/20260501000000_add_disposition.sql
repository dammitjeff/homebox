-- +goose Up
ALTER TABLE entities ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'none';

-- +goose Down
ALTER TABLE entities DROP COLUMN status;
