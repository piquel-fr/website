dev: tailwind templ air

tailwind:
	@tailwind -i views/css/styles.css -o public/styles.css --watch
templ:
	@templ generate -watch -proxy=http://localhost:8080
air:
	@air

run: build
	@./bin/main

build:
	@tailwind -i views/css/styles.css -o public/styles.css
	@templ generate
	@go build -o bin/main main.go
