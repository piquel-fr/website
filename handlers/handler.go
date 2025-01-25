package handlers

import (
	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/services/auth"
)

type Handler struct {
    db *repository.Queries
    auth *auth.AuthService
}

func Init(db *repository.Queries, auth *auth.AuthService) *Handler {
    return &Handler{
        db: db,
        auth: auth,
    }
}
