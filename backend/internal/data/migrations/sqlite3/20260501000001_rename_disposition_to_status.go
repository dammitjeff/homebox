package sqlite3

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upRenameDispositionToStatusSQLite, downRenameDispositionToStatusSQLite)
}

func upRenameDispositionToStatusSQLite(ctx context.Context, tx *sql.Tx) error {
	hasStatus, err := sqliteColumnExists(ctx, tx, "entities", "status")
	if err != nil {
		return err
	}
	if hasStatus {
		return nil
	}

	hasDisposition, err := sqliteColumnExists(ctx, tx, "entities", "disposition")
	if err != nil {
		return err
	}
	if !hasDisposition {
		return fmt.Errorf("entities table has neither disposition nor status column")
	}

	_, err = tx.ExecContext(ctx, `ALTER TABLE entities RENAME COLUMN disposition TO status`)
	return err
}

func downRenameDispositionToStatusSQLite(ctx context.Context, tx *sql.Tx) error {
	hasDisposition, err := sqliteColumnExists(ctx, tx, "entities", "disposition")
	if err != nil {
		return err
	}
	if hasDisposition {
		return nil
	}

	hasStatus, err := sqliteColumnExists(ctx, tx, "entities", "status")
	if err != nil {
		return err
	}
	if !hasStatus {
		return fmt.Errorf("entities table has neither status nor disposition column")
	}

	_, err = tx.ExecContext(ctx, `ALTER TABLE entities RENAME COLUMN status TO disposition`)
	return err
}

func sqliteColumnExists(ctx context.Context, tx *sql.Tx, table, column string) (bool, error) {
	rows, err := tx.QueryContext(ctx, fmt.Sprintf("PRAGMA table_info(%s)", table))
	if err != nil {
		return false, err
	}
	defer rows.Close()

	for rows.Next() {
		var cid int
		var name, typ string
		var notNull int
		var defaultValue sql.NullString
		var pk int
		if err := rows.Scan(&cid, &name, &typ, &notNull, &defaultValue, &pk); err != nil {
			return false, err
		}
		if name == column {
			return true, nil
		}
	}

	return false, rows.Err()
}
