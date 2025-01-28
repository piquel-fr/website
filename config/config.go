package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PublicHost              string
	Port                    string
	DBHost                  string
	DBPort                  string
	DBName                  string
	DBUser                  string
	DBPassword              string
	CookiesAuthSecret       string
	GoogleClientID          string
	GoogleClientSecret      string
	GithubClientID          string
	GithubClientSecret      string
}

var Envs = initConfig()

func initConfig() Config {
    godotenv.Load()

	return Config{
		PublicHost:              getEnv("HOST"),
		Port:                    getEnv("PORT"),
		DBHost:                  getEnv("DB_HOST"),
		DBPort:                  getEnv("DB_PORT"),
		DBName:                  getEnv("DB_NAME"),
		DBUser:                  getEnv("DB_USER"),
		DBPassword:              getEnv("DB_PASSWORD"),
		CookiesAuthSecret:       getEnv("COOKIES_AUTH_SECRET"),
		GoogleClientID:          getEnv("AUTH_GOOGLE_CLIENT_ID"),
		GoogleClientSecret:      getEnv("AUTH_GOOGLE_CLIENT_SECRET"),
		GithubClientID:          getEnv("AUTH_GITHUB_CLIENT_ID"),
		GithubClientSecret:      getEnv("AUTH_GITHUB_CLIENT_SECRET"),
	}
}

func getEnv(key string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	panic(fmt.Sprintf("Environment variable %s is not set", key))

}
