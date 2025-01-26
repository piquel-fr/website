package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/views"
)

func (handler *Handler) HandleHome(w http.ResponseWriter, r *http.Request) {
	views.Home(handler.users.GetPageData(w, r)).Render(r.Context(), w)
}
