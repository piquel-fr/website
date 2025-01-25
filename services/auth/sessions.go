package auth

import "github.com/gorilla/sessions"

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

