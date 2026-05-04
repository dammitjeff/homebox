-- +goose Up
ALTER TABLE entities DROP COLUMN IF EXISTS insured;

-- +goose Down
