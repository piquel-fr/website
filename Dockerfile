FROM golang:1.22 AS builder

WORKDIR /piquel.fr

# Dependencies
#RUN apt-get update && apt-get upgrade -y

# Setup env
RUN export PATH="$PATH:$(go env GOPATH)/bin"

# Setup go env
COPY go.mod .
RUN go mod download
RUN go mod tidy

# Copy src for compilation
COPY . .

# Build the binary
RUN go build -o ./bin/main ./main.go

# Now for run env
FROM alpine:latest

WORKDIR /piquel.fr

COPY --from=builder /piquel.fr/bin/main .

EXPOSE 50000

CMD [ "./main" ]

