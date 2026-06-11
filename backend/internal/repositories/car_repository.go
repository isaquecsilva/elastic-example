package repositories

import (
	"context"

	"github.com/isaquecsilva/elastic-example/backend/internal/models"
)

type ICarRepository interface {
	CreateCar(ctx context.Context, car models.Car) error
	FindAllCars(ctx context.Context, filters FindAllCarsFilters) ([]models.Car, error)
	FindCarsWithFilters(ctx context.Context, filters FindCarsFilters) ([]models.Car, error)
}

type FindAllCarsFilters struct {
	Offset int
	Limit  int
}

type FindCarsFilters struct {
	Model     string
	Brand     string
	Price     float64
	Year      uint
	SortField string
	SortOrder string
}
