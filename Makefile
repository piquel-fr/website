run: build
	@./bin/main

build:
	@tailwind -i views/css/styles.css -o public/styles.css
	@templ generate
	@go build -o bin/main main.go
