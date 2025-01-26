package handlers

import (
	"log"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/services/users"
)

type Handler struct {
	queries *repository.Queries
	auth    *auth.AuthService
	users   *users.UserService
}

func InitHandler(queries *repository.Queries, auth *auth.AuthService, users *users.UserService) *Handler {
    log.Printf("[Handler] Intialized handler!\n")
	return &Handler{
		queries: queries,
		auth:    auth,
		users:   users,
	}
}
