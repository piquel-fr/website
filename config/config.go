package config

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"gopkg.in/ini.v1"
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
	ConfigFile         string
}

type RouteConfig struct {
	isAuthenticated bool
	permission      string
}

var Envs Config
var RouteSettings map[string]RouteConfig

func InitConfig() {
	godotenv.Load()
	log.Printf("[Config] Loading configuration...")

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
		ConfigFile:         getDefaultEnv("CONFIG_FILE", "config.ini"),
	}
	log.Printf("[Config] Loaded environment configuration!")

	configData, err := ini.Load(Envs.ConfigFile)
	if err != nil {
		panic(err)
	}

    RouteSettings = make(map[string]RouteConfig)

	routes := configData.Section("Routes").KeysHash()
    for route, routeConfigString := range routes {
        routeConfigParts := strings.Split(routeConfigString, ",")
        isAuthenticated, err := strconv.ParseBool(routeConfigParts[0])
        if err != nil {
            panic(err)
        }

        config := RouteConfig{
            isAuthenticated: isAuthenticated,
            permission: routeConfigParts[1],
        }

        RouteSettings[route] = config
    }
    log.Printf("[Config] Loaded configuration from %s!", Envs.ConfigFile)
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
