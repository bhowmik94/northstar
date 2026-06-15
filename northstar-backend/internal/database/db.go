package database

import (
	"log"

	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func Connect() {
	connStr := "host=localhost port=5432 user=postgres password=postgres dbname=northstar sslmode=disable"

	db, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(("Cannot connect to DB"), err)
	}

	DB = db
	log.Println("Connected to PosegreSQL")
}
