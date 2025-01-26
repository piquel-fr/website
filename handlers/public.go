package handlers

import (
	"database/sql"
	"net/http"

	"github.com/PiquelChips/piquel.fr/types"
	"github.com/PiquelChips/piquel.fr/views"
	"github.com/gorilla/mux"
)

func (handler *Handler) HandleDirk(w http.ResponseWriter, r *http.Request) {
    views.Dirk(handler.users.GetPageData(w, r)).Render(r.Context(), w)
}

func (handler *Handler) HandleMinecraft(w http.ResponseWriter, r *http.Request) {
    views.Minecraft(handler.users.GetPageData(w, r)).Render(r.Context(), w)
}

func (handler *Handler) HandleProfile(w http.ResponseWriter, r *http.Request) {
    username := mux.Vars(r)["profile"]

    user, err := handler.queries.GetUserByUsername(r.Context(), username)
    if err != nil {
        if err == sql.ErrNoRows {
            http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
            return
        }
    }

    profile := &types.UserProfile{ User: user }

    group, err := handler.queries.GetGroupInfo(r.Context(), user.Group)
    if err != nil {
        panic(err)
    }

    profile.UserColor = group.Color
    profile.UserGroup = group.Displayname.String

    views.Profile(handler.users.GetPageData(w, r), profile).Render(r.Context(), w)
}
