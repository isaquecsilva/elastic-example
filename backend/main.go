package main

import (
	"cmp"
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/isaquecsilva/elastic-example/backend/internal/database"
	"github.com/isaquecsilva/elastic-example/backend/internal/handlers"
	"github.com/isaquecsilva/elastic-example/backend/internal/repositories"
	"github.com/isaquecsilva/elastic-example/backend/internal/services/carservice"
	"github.com/joho/godotenv"
)

func gracefulShutdown(f func()) {
	signChan := make(chan os.Signal, 1)
	defer close(signChan)
	signal.Notify(signChan, syscall.SIGTERM, syscall.SIGINT)

	fmt.Printf("[SIGNAL RECEIVED]: %s\n", (<-signChan).String())
	f()
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error parsing .env local file: %v", err)
	}

	conn, err := database.Connect(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	carsRepo := repositories.NewCarRepository(conn)
	carService := carservice.NewCarServiceImpl(carsRepo)
	carsHandler := handlers.NewCarsController(carService)

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello, World!")
	})

	router.GET("/cars", carsHandler.GetAllCarsHandler)
	router.GET("/cars/filter", carsHandler.GetCarsHandler)
	router.POST("/car", carsHandler.CreateCarHandler)

	svr := &http.Server{
		Addr:           cmp.Or(os.Getenv("ADDRESS"), ":9900"),
		Handler:        router.Handler(),
		ReadTimeout:    time.Millisecond,
		MaxHeaderBytes: 1 << 20,
	}

	shutdownDone := make(chan struct{})

	go gracefulShutdown(func() {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()
		svr.Shutdown(ctx)
		shutdownDone <- struct{}{}
	})

	if err := svr.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("Error starting server: %v", err)
	}

	<-shutdownDone
}
