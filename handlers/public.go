package handlers

import (
	"database/sql"
	"net/http"

	"github.com/PiquelChips/piquel.fr/services/database"
	"github.com/PiquelChips/piquel.fr/services/users"
	"github.com/PiquelChips/piquel.fr/types"
	"github.com/PiquelChips/piquel.fr/views"
	"github.com/gorilla/mux"
)

func HandleDirk(w http.ResponseWriter, r *http.Request) {
    views.Dirk(users.GetPageData(w, r)).Render(r.Context(), w)
}

func HandleMinecraft(w http.ResponseWriter, r *http.Request) {
    views.Minecraft(users.GetPageData(w, r)).Render(r.Context(), w)
}

func HandleProfile(w http.ResponseWriter, r *http.Request) {
    username := mux.Vars(r)["profile"]

    user, err := database.Queries.GetUserByUsername(r.Context(), username)
    if err != nil {
        if err == sql.ErrNoRows {
            http.Redirect(w, r, "/", http.StatusNotFound)
            return
        }
    }

    profile := &types.UserProfile{ User: user }

    group, err := database.Queries.GetGroupInfo(r.Context(), user.Group)
    if err != nil {
        panic(err)
    }

    profile.UserColor = group.Color
    profile.UserGroup = group.Displayname.String

    views.Profile(users.GetPageData(w, r), profile).Render(r.Context(), w)
}
