package main

import (
	"log"
	"net/http"
	"os"

	"github.com/PiquelChips/piquel.fr/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("Starting piquel.fr website...\n")

	godotenv.Load()
	address := os.Getenv("HOST") + ":" + os.Getenv("PORT")

	router := mux.NewRouter()

	handler := handlers.New()

	router.HandleFunc("/", handler.HandleHome).Methods("GET")

	router.PathPrefix("/public").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))

	log.Printf("Starting web server on %s", address)
	log.Fatalf(http.ListenAndServe(address, router).Error())
}
