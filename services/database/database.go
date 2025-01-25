package database

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/PiquelChips/piquel.fr/config"
	repository "github.com/PiquelChips/piquel.fr/database/generated"
	_ "github.com/lib/pq"
)

func InitDB() *repository.Queries {

    log.Printf("[Database] Attempting to connect to database...\n")

    connectString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", config.Envs.DBHost, config.Envs.DBPort, config.Envs.DBUser, config.Envs.DBPassword, config.Envs.DBName)
    connection, err := sql.Open("postgres", connectString)
    if err != nil {
        panic(err)
    }

    err = connection.Ping()
    if err != nil {
        panic(err)
    }

    log.Printf("[Database] Successfully connected to the database!\n")

    queries := repository.New(connection)

    return queries
}

