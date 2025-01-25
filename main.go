package main

import (
	"log"
	"net/http"
	"os"

	"github.com/PiquelChips/piquel.fr/config"
	"github.com/PiquelChips/piquel.fr/handlers"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/services/database"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Initializing piquel.fr website...\n")

	godotenv.Load()
	address := os.Getenv("HOST") + ":" + os.Getenv("PORT")

	router := mux.NewRouter()

	dbService := database.InitDB()
	cookieStore := auth.InitCookieStore(auth.SessionsOptions{
	    CookiesKey: config.Envs.CookiesAuthSecret,
	    MaxAge: config.Envs.CookiesAuthAgeInSeconds,
	    Secure: config.Envs.CookiesAuthIsSecure,
	    HttpOnly: config.Envs.CookiesAuthIsHttpOnly,
	})
	authService := auth.InitAuthService(cookieStore)
	handler := handlers.Init(dbService, authService)

	router.Use(authService.AuthMiddleware)

	router.HandleFunc("/", handler.HandleHome).Methods("GET")

	// Basic public endpoints
	router.HandleFunc("/minecraft", handler.HandleMinecraft).Methods("GET")
	router.HandleFunc("/dirk", handler.HandleDirk).Methods("GET")

	// SNT endpoints
	router.HandleFunc("/snt/linus", handler.HandleLinus).Methods("GET")
	router.HandleFunc("/snt/linux", handler.HandleLinux).Methods("GET")
	router.HandleFunc("/snt/musset", handler.HandleMusset).Methods("GET")

	// Auth
	router.HandleFunc("/auth/login", handler.HandleLogin).Methods("GET")
	router.HandleFunc("/auth/logout", handler.HandleLogout).Methods("GET")
	router.HandleFunc("/auth/{provider}", handler.HandleProviderLogin).Methods("GET")
	router.HandleFunc("/auth/{provider}/callback", handler.HandleAuthCallback).Methods("GET")

	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	log.Printf("[Mux] Starting web server on %s", address)
	log.Fatalf("%s", http.ListenAndServe(address, router).Error())
}
