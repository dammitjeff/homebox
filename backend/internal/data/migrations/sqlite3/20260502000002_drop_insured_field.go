package sqlite3

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upDropInsuredField, downDropInsuredField)
}

func upDropInsuredField(ctx context.Context, tx *sql.Tx) error {
	rows, err := tx.QueryContext(ctx, "PRAGMA table_info(entities)")
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var cid int
		var name, typ string
		var notNull int
		var defaultValue sql.NullString
		var pk int
		if err := rows.Scan(&cid, &name, &typ, &notNull, &defaultValue, &pk); err != nil {
			return err
		}
		if name == "insured" {
			_, err = tx.ExecContext(ctx, "ALTER TABLE entities DROP COLUMN insured")
			return err
		}
	}

	return rows.Err()
}

func downDropInsuredField(ctx context.Context, tx *sql.Tx) error {
	return nil
}
