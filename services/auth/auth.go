package auth

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PiquelChips/piquel.fr/config"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
	"github.com/markbates/goth/providers/google"
)

const SessionName = "user_session"

type AuthService struct{}

func InitAuthService(store sessions.Store) *AuthService {
	gothic.Store = store
	goth.UseProviders(
		google.New(
			config.Envs.GoogleClientID,
			config.Envs.GoogleClientSecret,
			buildCallbackURL("google"),
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
		),
		github.New(
			config.Envs.GithubClientID,
			config.Envs.GithubClientSecret,
			buildCallbackURL("github"),
            "user:email",
		),
	)

	return &AuthService{}
}

func (s *AuthService) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !IsAuthenticatedRoute(r) {
			next.ServeHTTP(w, r)
			return
		}

		session, err := s.GetSessionUser(r)
		if err != nil {
			http.Redirect(w, r, "/auth/login", http.StatusTemporaryRedirect)
			return
		}

		log.Printf("user session %v", session)
		next.ServeHTTP(w, r)
	})
}

func IsAuthenticatedRoute(r *http.Request) bool {
    // remove the empty string caused by leading slash
    routes := strings.Split(r.URL.String(), "/")[1:]
    switch routes[0] {
    case "settings":
        return true
    case "dirk":
        return true
    }
	return false
}

func buildCallbackURL(provider string) string {
    url := fmt.Sprintf("http://%s:%s/auth/%s/callback", config.Envs.PublicHost, config.Envs.Port, provider) 
    log.Printf("[Auth] Added auth provider listener for %s on %s", provider, url)
	return url
}
