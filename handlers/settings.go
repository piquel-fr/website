package handlers

import (
	"net/http"
	"strings"

	repository "github.com/PiquelChips/piquel.fr/database/generated"
	"github.com/PiquelChips/piquel.fr/views/settings"
)

func (handler *Handler) HandleSettingsRedirect(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "/settings/profile", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleProfileSettings(w http.ResponseWriter, r *http.Request) {
    settings.ProfileSettings(handler.users.GetPageData(w, r), "", 200).Render(r.Context(), w)
}

func (handler *Handler) HandleProfileSettingsUpdate(w http.ResponseWriter, r *http.Request) {
    user_id := 20
    params := repository.UpdateUserParams{
        ID: int32(user_id),
        Username: strings.ReplaceAll(strings.ToLower(r.FormValue("username")), " ", ""),
        Name: r.FormValue("name"),
        Image: r.FormValue("image"),
    }
    handler.queries.UpdateUser(r.Context(), params)
    
    settings.ProfileSettings(handler.users.GetPageData(w, r), "Successfully updated settings!", 200).Render(r.Context(), w)
}
