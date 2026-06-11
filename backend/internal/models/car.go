package models

import "github.com/google/uuid"

type Car struct {
	ID    string  `gorm:"primaryKey"`
	Model string  `json:"model"`
	Brand string  `json:"brand"`
	Year  uint    `json:"year"`
	Price float64 `json:"price"`
}

func NewCar(model, brand string, year uint, price float64) Car {
	carId, _ := uuid.NewV7()

	return Car{
		ID:    carId.String(),
		Model: model,
		Brand: brand,
		Year:  year,
		Price: price,
	}
}
