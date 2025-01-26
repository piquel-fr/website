package auth

import (
	"log"
	"net/http"

	"github.com/PiquelChips/piquel.fr/config"
	"github.com/PiquelChips/piquel.fr/errors"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
)

func InitCookieService() *sessions.CookieStore {
    store := sessions.NewCookieStore([]byte(config.Envs.CookiesAuthSecret))

    store.MaxAge(config.Envs.CookiesAuthAgeInSeconds)
    store.Options.Path = "/"
    store.Options.HttpOnly = config.Envs.CookiesAuthIsHttpOnly // should be true if http
    store.Options.Secure = config.Envs.CookiesAuthIsSecure // should be true if https

    log.Printf("[Cookies] Initialized cookie service!\n")

    return store
}

func (s *AuthService) GetSessionUser(r *http.Request) (goth.User, error) {
	session, err := gothic.Store.Get(r, SessionName)
	if err != nil {
		return goth.User{}, err
	}

	user := session.Values["user"]
	if user == nil {
		return goth.User{}, errors.ErrorNotAuthenticated
	}
	return user.(goth.User), nil
}

func (s *AuthService) StoreUserSession(w http.ResponseWriter, r *http.Request, user goth.User) error {
	session, err := gothic.Store.Get(r, SessionName)
    if err != nil {
        panic(err)
    }

	session.Values["user"] = user

	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}

	return nil
}

func (s *AuthService) RemoveUserSession(w http.ResponseWriter, r *http.Request) {
    session , err := gothic.Store.Get(r, SessionName)
    if err != nil {
        panic(err)
    }
    session.Values["user"] = goth.User{}
    session.Options.MaxAge = -1
    session.Save(r, w)
}

