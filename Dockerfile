FROM golang:1.26-bookworm

WORKDIR /app

COPY backend/go.mod backend/go.sum .
COPY backend/.air.toml .

RUN go mod download

COPY backend/* .

RUN go install github.com/air-verse/air@latest

EXPOSE 9900/tcp

CMD ["air", "-c", ".air.toml"]
