package auth

import (
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
)

type SessionsOptions struct {
    CookiesKey string
    MaxAge int
    HttpOnly bool // should be true if http
    Secure bool // should be true if https
}

func InitCookieStore(options SessionsOptions) *sessions.CookieStore {
    store := sessions.NewCookieStore([]byte(options.CookiesKey))

    store.MaxAge(options.MaxAge)
    store.Options.Path = "/"
    store.Options.HttpOnly = options.HttpOnly
    store.Options.Secure = options.Secure

    return store
}

func (s *AuthService) GetSessionUser(r *http.Request) (goth.User, error) {
	session, err := gothic.Store.Get(r, SessionName)
	if err != nil {
		return goth.User{}, err
	}

	user := session.Values["user"]
	if user == nil {
		return goth.User{}, fmt.Errorf("User is not authenticated! %v", user)
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
		return err
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

