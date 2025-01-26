package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/views/settings"
)

func (handler *Handler) HandleSettingsRedirect(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "/settings/profile", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleProfileSettings(w http.ResponseWriter, r *http.Request) {
    settings.ProfileSettings(handler.users.GetPageData(w, r)).Render(r.Context(), w)
}
