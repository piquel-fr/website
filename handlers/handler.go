package handlers

import (
	"log"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/services/permissions"
	"github.com/PiquelChips/piquel.fr/services/users"
)

type Handler struct {
	queries *repository.Queries
	auth    *auth.AuthService
	users   *users.UserService
    permissions *permissions.PermissionsService
}

func InitHandler(queries *repository.Queries, auth *auth.AuthService, users *users.UserService, permissions *permissions.PermissionsService) *Handler {
    log.Printf("[Handler] Intialized handler!\n")
	return &Handler{
		queries: queries,
		auth:    auth,
		users:   users,
        permissions: permissions,
	}
}
