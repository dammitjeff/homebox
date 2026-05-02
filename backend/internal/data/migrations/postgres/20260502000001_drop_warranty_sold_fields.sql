-- +goose Up
ALTER TABLE entities DROP COLUMN IF EXISTS lifetime_warranty;
ALTER TABLE entities DROP COLUMN IF EXISTS warranty_expires;
ALTER TABLE entities DROP COLUMN IF EXISTS warranty_details;
ALTER TABLE entities DROP COLUMN IF EXISTS sold_date;
ALTER TABLE entities DROP COLUMN IF EXISTS sold_to;
ALTER TABLE entities DROP COLUMN IF EXISTS sold_price;
ALTER TABLE entities DROP COLUMN IF EXISTS sold_notes;

-- +goose Down
