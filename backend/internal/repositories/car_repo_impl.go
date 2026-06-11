package repositories

import (
	"context"
	"fmt"
	"strings"

	"github.com/isaquecsilva/elastic-example/backend/internal/models"
	"gorm.io/gorm"
)

var _ ICarRepository = (*CarRepository)(nil)

type CarRepository struct {
	db *gorm.DB
}

func NewCarRepository(db *gorm.DB) *CarRepository {
	return &CarRepository{db: db}
}

func (r *CarRepository) CreateCar(ctx context.Context, car models.Car) error {
	return r.db.WithContext(ctx).FirstOrCreate(&car).Error
}

func (r *CarRepository) FindCarsWithFilters(ctx context.Context, filters FindCarsFilters) ([]models.Car, error) {
	cars := []models.Car{}

	tx := r.db.WithContext(ctx).Where("model LIKE ?", strings.ToLower("%"+filters.Model+"%"))

	if filters.Brand != "" {
		tx.Where("brand = ?", filters.Brand)
	}
	if filters.Year != 0 {
		tx.Where("year = ?", filters.Year)
	}
	if filters.Price != 0 {
		tx.Where("price = ?", filters.Price)
	}

	tx.Order(fmt.Sprintf("%s %s", filters.SortField, filters.SortOrder))
	return cars, tx.Find(&cars).Error
}

func (r *CarRepository) FindAllCars(ctx context.Context, filters FindAllCarsFilters) ([]models.Car, error) {
	cars := []models.Car{}
	tx := r.db.WithContext(ctx).Offset(filters.Offset).Limit(filters.Limit)
	return cars, tx.Find(&cars).Error
}
