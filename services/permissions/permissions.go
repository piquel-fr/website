package permissions

import (
	"context"
	"log"
	"strings"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
)

type PermissionsService struct {
	queries *repository.Queries
}

func InitPermissionsService(queries *repository.Queries) *PermissionsService {
    log.Printf("[Permissions] Initialized permissions service!")

	return &PermissionsService{
		queries: queries,
    }
}

func (service *PermissionsService) UserHasPermission(userId int32, permission string) bool {
    userPermissions, _ := service.queries.GetUserPermissions(context.Background(), userId)

    for _, userPermission := range userPermissions {
        if matchPermission(permission, userPermission) {
            return true
        }
    }

    return false
}

func matchPermission(permission string, match string) bool {
    permissionParts := strings.Split(permission, ".")
    matchParts := strings.Split(match, ".")

    if len(matchParts) > len(permissionParts) {
        return false
    }

    for i, part := range matchParts {
        if part == "*" {
            return true
        }
        if part != permissionParts[i] {
            return false
        }
    }

    return len(matchParts) == len(permissionParts)
}
