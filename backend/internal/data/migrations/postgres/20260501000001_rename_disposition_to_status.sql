-- +goose Up
-- +goose StatementBegin
DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = current_schema()
			AND table_name = 'entities'
			AND column_name = 'status'
	) THEN
		RETURN;
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = current_schema()
			AND table_name = 'entities'
			AND column_name = 'disposition'
	) THEN
		RAISE EXCEPTION 'entities table has neither disposition nor status column';
	END IF;

	ALTER TABLE "entities" RENAME COLUMN "disposition" TO "status";
END $$;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = current_schema()
			AND table_name = 'entities'
			AND column_name = 'disposition'
	) THEN
		RETURN;
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = current_schema()
			AND table_name = 'entities'
			AND column_name = 'status'
	) THEN
		RAISE EXCEPTION 'entities table has neither status nor disposition column';
	END IF;

	ALTER TABLE "entities" RENAME COLUMN "status" TO "disposition";
END $$;
-- +goose StatementEnd
