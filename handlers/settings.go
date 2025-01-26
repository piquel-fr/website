package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/views/settings"
	"github.com/gorilla/mux"
)

func (handler *Handler) HandleSettingsRedirect(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "/settings/profile", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleSettings(w http.ResponseWriter, r *http.Request) {
    page := mux.Vars(r)["settings"]
    switch page {
    case "profile":
        settings.ProfileSettings(handler.users.GetPageData(w, r), page).Render(r.Context(), w)
    default:
        http.Redirect(w, r, "/settings/profile", http.StatusTemporaryRedirect)
    }

}
