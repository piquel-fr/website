package handlers

import (
	"database/sql"

	"github.com/PiquelChips/piquel.fr/services/auth"
)

type Handler struct {
    // Store ref to database and other stuff here
    db *sql.DB
    auth *auth.AuthService
}

func Init(db *sql.DB, auth *auth.AuthService) *Handler {
    return &Handler{
        db: db,
        auth: auth,
    }
}
