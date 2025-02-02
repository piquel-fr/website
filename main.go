package main

import (
	"log"
	"net/http"

	"github.com/PiquelChips/piquel.fr/config"
	"github.com/PiquelChips/piquel.fr/handlers"
	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/PiquelChips/piquel.fr/services/database"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Initializing piquel.fr website...\n")

    // Intialize services
    config.LoadConfig()
    auth.InitAuthentication()
    auth.InitCookieStore()
    database.InitDatabase()

    // Setup various services
	router := mux.NewRouter()

    // Setup middleware
	router.Use(auth.AuthMiddleware)

	router.HandleFunc("/", handlers.HandleHome).Methods("GET")

    router.HandleFunc("/profile", handlers.HandleBaseProfile).Methods("GET")
    router.HandleFunc("/profile/{profile}", handlers.HandleProfile).Methods("GET")

    router.HandleFunc("/settings", handlers.HandleSettingsRedirect).Methods("GET")
    router.HandleFunc("/settings/profile", handlers.HandleProfileSettings).Methods("GET")
    router.HandleFunc("/settings/profile", handlers.HandleProfileSettingsUpdate).Methods("POST")

	// Basic public endpoints
	router.HandleFunc("/minecraft", handlers.HandleMinecraft).Methods("GET")
	router.HandleFunc("/dirk", handlers.HandleDirk).Methods("GET")

	// SNT endpoints
	router.HandleFunc("/snt/linus", handlers.HandleLinus).Methods("GET")
	router.HandleFunc("/snt/linux", handlers.HandleLinux).Methods("GET")
	router.HandleFunc("/snt/musset", handlers.HandleMusset).Methods("GET")

	// Auth
	router.HandleFunc("/auth/login", handlers.HandleLogin).Methods("GET")
	router.HandleFunc("/auth/logout", handlers.HandleLogout).Methods("GET")
	router.HandleFunc("/auth/{provider}", handlers.HandleProviderLogin).Methods("GET")
	router.HandleFunc("/auth/{provider}/callback", handlers.HandleAuthCallback).Methods("GET")

    // Serve static files
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	godotenv.Load()
	address := config.Envs.Host + ":" + config.Envs.Port

	log.Printf("Starting web server on %s", address)
	log.Fatalf("%s", http.ListenAndServe(address, router).Error())
}
