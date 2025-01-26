FROM golang:1.22 AS builder

WORKDIR /piquel.fr

# Setup env
RUN export PATH="$PATH:$(go env GOPATH)/bin"

# Dependencies
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl sqlc

# Setup Tailwindcss
RUN curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
RUN mv tailwindcss-linux-x64 tailwindcss
RUN chmod +x tailwindcss

# Setup go dependencies
COPY go.mod .
RUN go mod download
RUN go mod tidy

# Generate sqlc files
COPY database .

# Copy src for compilation
COPY . .

# Generate needed code
RUN templ generate
# Generate tailwind code
RUN tailwindcss -i views/css/styles.css -o public/styles.css

# Build the binary
RUN go build -o ./bin/main ./main.go

# Now for run env
FROM alpine:latest

WORKDIR /piquel.fr

COPY --from=builder /piquel.fr/bin/main .
COPY --from=builder /piquel.fr/public .

EXPOSE 50000

CMD [ "./main" ]

