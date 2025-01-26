package users

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"strings"
	"time"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/errors"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/types"
	"github.com/markbates/goth"
)

type UserService struct {
	queries *repository.Queries
    auth *auth.AuthService
}

func InitUserService(queries *repository.Queries) *UserService {
    log.Printf("[Users] Initialized users service!\n")

	return &UserService{
		queries: queries,
	}
}

func (s *UserService) GetPageData(w http.ResponseWriter, r *http.Request) *types.PageData {
    data := &types.PageData{}

    s.getUserData(r, data)

	return data
}

func (s *UserService) getUserData(r *http.Request, data *types.PageData) {
    gothUser, err := s.auth.GetSessionUser(r)
    if err != nil {
        if err == errors.ErrorNotAuthenticated {
            log.Printf("%s", err)
            return
        }
        panic(err)
    }

    dbUser, err := s.queries.GetUserByEmail(r.Context(), gothUser.Email)
    if err != nil {
        panic(err)
    }

    group, err := s.queries.GetGroupInfo(r.Context(), dbUser.Group)

    data.Profile.User = dbUser
    data.Profile.UserColor = group.Color
    data.Profile.UserGroup = group.Displayname.String
}

func (s *UserService) VerifyUser(context context.Context, inUser *goth.User) {
    _, err := s.queries.GetUserByEmail(context, inUser.Email)
    if err != nil {
        if err == sql.ErrNoRows {
            s.registerUser(context, inUser)
            return
        }
        panic(err)
    }
}

func (s *UserService) registerUser(context context.Context, inUser *goth.User) {
    params := repository.AddUserParams{}

    params.Email = inUser.Email
    params.Group = "default"
    params.Image = inUser.AvatarURL
    params.Created = time.Now()
    params.Name = inUser.Name

    switch inUser.Provider {
    case "google":
        params.Username = strings.ReplaceAll(strings.ToLower(inUser.Name), " ", "")
    case "github":
        params.Username = strings.ReplaceAll(strings.ToLower(inUser.NickName), " ", "")
    }

    err := s.queries.AddUser(context, params)
    if err != nil {
        panic(err)
    }
}
