-- +goose Up
ALTER TABLE entities RENAME COLUMN disposition TO status;

-- +goose Down
ALTER TABLE entities RENAME COLUMN status TO disposition;
