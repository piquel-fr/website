dev: tailwind templ air

tailwind:
	@tailwindcss -i views/css/styles.css -o public/styles.css --watch
templ:
	@templ generate -watch -proxy=http://localhost:8080
air:
	@air

run: build
	@./bin/main

build:
	@tailwindcss -i views/css/styles.css -o public/styles.css
	@templ generate
	@sqlc generate
	@go build -o bin/main main.go
