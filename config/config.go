package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PublicHost         string
	Host               string
	Port               string
	SSL                string
	DB_URL             string
	CookiesAuthSecret  string
	GoogleClientID     string
	GoogleClientSecret string
	GithubClientID     string
	GithubClientSecret string
}

var Envs = initConfig()

func initConfig() Config {
	godotenv.Load()

	log.Printf("[Config] Loading configuration...")

	return Config{
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
	}
}

func getEnv(key string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	panic(fmt.Sprintf("Environment variable %s is not set", key))

}
