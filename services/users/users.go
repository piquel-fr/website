package users

import (
	"log"
	"net/http"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/types"
	"github.com/markbates/goth"
)

type UserService struct {
	queries *repository.Queries
}

func InitUserService(queries *repository.Queries) *UserService {
    log.Printf("[Users] Initialized users service!\n")

	return &UserService{
		queries: queries,
	}
}

func (s *UserService) GetPageData(w http.ResponseWriter, r *http.Request) *types.PageData {
	return &types.PageData{User: types.User{Username: "piquel", Name: "Piquel", Image: "https://avatars.githubusercontent.com/u/63727792?v=4", Email: "ronanggx2008@gmail.com", Color: "red", GroupName: "admin"}}
}

func (s *UserService) RegisterUser(user *goth.User) {

}
