package router

import (
	"log"
	"net/http"

	"github.com/PiquelChips/piquel.fr/services/auth"
	"github.com/gorilla/mux"
)

type Router struct {}

var router *mux.Router

func InitRouter() *Router {
    log.Printf("[Router] Initializing router...")
    router = mux.NewRouter()

    // Setup middleware
	router.Use(auth.AuthMiddleware)

    log.Printf("[Router] Initialized routed!")
    return &Router{}
}

func (r *Router) Start(address string) {
    log.Printf("[Router] Starting router...")

    // Serve static files
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("public"))))

    log.Printf("[Router] Listening on %s!", address)
    log.Fatalf("%s", http.ListenAndServe(address, router).Error())
}

func (r *Router) AddRoute(path string, handler func(http.ResponseWriter, *http.Request), method string) {
    // Check with configuration

    router.HandleFunc(path, handler).Methods(method)
}
