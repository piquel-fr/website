package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/views/snt"
)

func (handler *Handler) HandleLinus(w http.ResponseWriter, r *http.Request) {
    snt.Linus().Render(r.Context(), w)
}

func (handler *Handler) HandleLinux(w http.ResponseWriter, r *http.Request) {
    snt.Linux().Render(r.Context(), w)
}

func (handler *Handler) HandleMusset(w http.ResponseWriter, r *http.Request) {
    snt.Musset().Render(r.Context(), w)
}
