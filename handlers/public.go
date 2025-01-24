package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/views"
)

func (handler *Handler) HandleDirk(w http.ResponseWriter, r *http.Request) {
    views.Dirk().Render(r.Context(), w)
}

func (handler *Handler) HandleMinecraft(w http.ResponseWriter, r *http.Request) {
    views.Minecraft().Render(r.Context(), w)
}
