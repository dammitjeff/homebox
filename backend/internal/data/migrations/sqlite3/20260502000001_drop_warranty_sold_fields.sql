-- +goose Up
ALTER TABLE entities DROP COLUMN lifetime_warranty;
ALTER TABLE entities DROP COLUMN warranty_expires;
ALTER TABLE entities DROP COLUMN warranty_details;
ALTER TABLE entities DROP COLUMN sold_date;
ALTER TABLE entities DROP COLUMN sold_to;
ALTER TABLE entities DROP COLUMN sold_price;
ALTER TABLE entities DROP COLUMN sold_notes;

-- +goose Down
