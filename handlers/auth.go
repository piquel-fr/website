package handlers

import (
	"net/http"

	"github.com/PiquelChips/piquel.fr/errors"
	"github.com/PiquelChips/piquel.fr/views/auth"
	"github.com/markbates/goth/gothic"
)

func (handler *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
    _, err := handler.auth.GetSessionUser(r)
    if err == errors.ErrorNotAuthenticated {
	    auth.Login(handler.users.GetPageData(w, r)).Render(r.Context(), w)
    }
    http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleProviderLogin(w http.ResponseWriter, r *http.Request) {
	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		gothic.BeginAuthHandler(w, r)
		return
	}

    handler.users.VerifyUser(r.Context(), &user)

	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleAuthCallback(w http.ResponseWriter, r *http.Request) {
	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		panic(err)
	}

    handler.users.VerifyUser(r.Context(), &user)
    /*

	err = handler.auth.StoreUserSession(w, r, user)
	if err != nil {
		panic(err)
	}
    */

	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func (handler *Handler) HandleLogout(w http.ResponseWriter, r *http.Request) {
    err := gothic.Logout(w, r)
    if err != nil {
        panic(err)
    }

    handler.auth.RemoveUserSession(w, r)
    http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}
