package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/yaml.v3"
)

var Envs Config
var Routes struct {
    Routes []Route
}

func LoadConfig() {
	godotenv.Load()
	log.Printf("[Config] Loading configuration...")

    // Load config from environment
	Envs = Config{
		PublicHost:         getEnv("PUBLIC_HOST"),
		Host:               getEnv("HOST"),
		Port:               getEnv("PORT"),
		SSL:                getEnv("SSL"),
		DB_URL:             getEnv("DB_URL"),
		CookiesAuthSecret:  getEnv("COOKIES_AUTH_SECRET"),
		GoogleClientID:     getEnv("AUTH_GOOGLE_CLIENT_ID"),
		GoogleClientSecret: getEnv("AUTH_GOOGLE_CLIENT_SECRET"),
		GithubClientID:     getEnv("AUTH_GITHUB_CLIENT_ID"),
		GithubClientSecret: getEnv("AUTH_GITHUB_CLIENT_SECRET"),
		ConfigPath:         getDefaultEnv("CONFIG_PATH", "config"),
	}
	log.Printf("[Config] Loaded environment configuration!")

    // Load routes config
    routesData, err := os.ReadFile(fmt.Sprintf("%s/routes.yml", Envs.ConfigPath))
    if err != nil {
        panic(err)
    }
    
    err = yaml.Unmarshal(routesData, &Routes)
    if err != nil {
        panic(err)
    }

    log.Printf("%v", Routes)
}

func getEnv(key string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	panic(fmt.Sprintf("Environment variable %s is not set", key))
}

func getDefaultEnv(key string, defaultValue string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return defaultValue
}
