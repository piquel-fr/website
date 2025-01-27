FROM golang:1.23.5 AS builder

WORKDIR /piquel.fr

# Setup env
RUN export PATH="$PATH:$(go env GOPATH)/bin"

# Dependencies
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
RUN go install github.com/a-h/templ/cmd/templ@latest

# Setup Tailwindcss
RUN curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
RUN mv tailwindcss-linux-x64 tailwindcss
RUN chmod +x tailwindcss
RUN mv tailwindcss /usr/bin

# Setup go dependencies
COPY go.mod .
RUN go mod download

# Copy static files
COPY public .

# Generate sqlc files
COPY sqlc.yml .
COPY database ./database
RUN sqlc generate

# Templ files
COPY views/ .
COPY components/ .

# Copy everything else
COPY . .

# Generate templ related files
RUN templ generate
RUN tailwindcss -i views/css/styles.css -o public/styles.css

RUN go mod tidy

# Build the binary
RUN go build -o ./bin/main ./main.go

# Now for run env
FROM alpine:latest

WORKDIR /piquel.fr

COPY --from=builder /piquel.fr/bin/main .
COPY --from=builder /piquel.fr/public .

EXPOSE 50000

CMD [ "./main" ]
