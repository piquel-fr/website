package main

import (
	"log"
	"net/http"

	"github.com/PiquelChips/piquel.fr/config"
	"github.com/PiquelChips/piquel.fr/handlers"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/services/database"
	"github.com/PiquelChips/piquel.fr/services/users"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Initializing piquel.fr website...\n")

    config.InitConfig()

    // Setup various services
	dbService := database.InitDBService()
	cookieService := auth.InitCookieService()
	authService := auth.InitAuthService(cookieService)
    userService := users.InitUserService(dbService)
	handler := handlers.InitHandler(dbService, authService, userService)

	router := mux.NewRouter()

    // Setup middleware
	router.Use(authService.AuthMiddleware)

	router.HandleFunc("/", handler.HandleHome).Methods("GET")
    router.HandleFunc("/profile/{profile}", handler.HandleProfile).Methods("GET")

    router.HandleFunc("/settings", handler.HandleSettingsRedirect).Methods("GET")
    router.HandleFunc("/settings/profile", handler.HandleProfileSettings).Methods("GET")
    router.HandleFunc("/settings/profile", handler.HandleProfileSettingsUpdate).Methods("POST")

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

    // Serve static files
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	godotenv.Load()
	address := config.Envs.Host + ":" + config.Envs.Port

	log.Printf("[Mux] Starting web server on %s", address)
	log.Fatalf("%s", http.ListenAndServe(address, router).Error())
}
