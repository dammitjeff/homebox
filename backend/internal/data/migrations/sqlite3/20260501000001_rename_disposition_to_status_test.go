package sqlite3

import (
	"context"
	"database/sql"
	"testing"

	_ "github.com/sysadminsmedia/homebox/backend/pkgs/cgofreesqlite"
)

func TestRenameDispositionToStatusSQLiteAlreadyHasStatus(t *testing.T) {
	db := openSQLiteMigrationTestDB(t)
	execSQLiteMigrationTestSQL(t, db, `CREATE TABLE entities (id INTEGER PRIMARY KEY, status VARCHAR(20) NOT NULL DEFAULT 'none')`)

	err := withSQLiteMigrationTestTx(t, db, func(tx *sql.Tx) error {
		return upRenameDispositionToStatusSQLite(context.Background(), tx)
	})
	if err != nil {
		t.Fatalf("migration failed: %v", err)
	}

	assertSQLiteMigrationTestColumn(t, db, "status", true)
	assertSQLiteMigrationTestColumn(t, db, "disposition", false)
}

func TestRenameDispositionToStatusSQLiteRenamesDisposition(t *testing.T) {
	db := openSQLiteMigrationTestDB(t)
	execSQLiteMigrationTestSQL(t, db, `CREATE TABLE entities (id INTEGER PRIMARY KEY, disposition VARCHAR(20) NOT NULL DEFAULT 'none')`)

	err := withSQLiteMigrationTestTx(t, db, func(tx *sql.Tx) error {
		return upRenameDispositionToStatusSQLite(context.Background(), tx)
	})
	if err != nil {
		t.Fatalf("migration failed: %v", err)
	}

	assertSQLiteMigrationTestColumn(t, db, "status", true)
	assertSQLiteMigrationTestColumn(t, db, "disposition", false)
}

func openSQLiteMigrationTestDB(t *testing.T) *sql.DB {
	t.Helper()

	db, err := sql.Open("sqlite3", "file::memory:?cache=shared&_time_format=sqlite")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}
	t.Cleanup(func() {
		if err := db.Close(); err != nil {
			t.Fatalf("close sqlite: %v", err)
		}
	})

	return db
}

func execSQLiteMigrationTestSQL(t *testing.T, db *sql.DB, query string) {
	t.Helper()

	if _, err := db.ExecContext(context.Background(), query); err != nil {
		t.Fatalf("exec sql: %v", err)
	}
}

func withSQLiteMigrationTestTx(t *testing.T, db *sql.DB, fn func(*sql.Tx) error) error {
	t.Helper()

	tx, err := db.BeginTx(context.Background(), nil)
	if err != nil {
		t.Fatalf("begin tx: %v", err)
	}

	if err := fn(tx); err != nil {
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			t.Fatalf("rollback tx: %v", rollbackErr)
		}
		return err
	}

	return tx.Commit()
}

func assertSQLiteMigrationTestColumn(t *testing.T, db *sql.DB, column string, want bool) {
	t.Helper()

	tx, err := db.BeginTx(context.Background(), nil)
	if err != nil {
		t.Fatalf("begin tx: %v", err)
	}
	defer func() {
		if err := tx.Rollback(); err != nil && err != sql.ErrTxDone {
			t.Fatalf("rollback tx: %v", err)
		}
	}()

	got, err := sqliteColumnExists(context.Background(), tx, "entities", column)
	if err != nil {
		t.Fatalf("check column %q: %v", column, err)
	}
	if got != want {
		t.Fatalf("column %q existence = %t, want %t", column, got, want)
	}
}
