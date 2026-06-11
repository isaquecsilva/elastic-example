package carservice

import (
	"github.com/isaquecsilva/elastic-example/backend/internal/models"
	"github.com/isaquecsilva/elastic-example/backend/pkg/validation"
)

type CreateCarParams struct {
	validation.BaseValidator[CreateCarParams]
	Model string  `json:"model" validate:"required"`
	Brand string  `json:"brand" validate:"required"`
	Year  uint    `json:"year" validate:"required"`
	Price float64 `json:"price" validate:"required"`
}

type CreateCarResponse struct {
	Car models.Car `json:"car"`
}

type GetCarsParams struct {
	validation.BaseValidator[GetCarsParams]
	Model     string  `json:"model"`
	Brand     string  `json:"brand"`
	Price     float64 `json:"price"`
	Year      uint    `json:"year"`
	SortField string  `json:"sortField" validate:"oneof=price year"`
	SortOrder string  `json:"sortOrder" validate:"oneof=asc desc"`
}

type GetCarsResponse struct {
	Cars []models.Car `json:"cars"`
}

type GetAllCarsParams struct {
	validation.BaseValidator[GetAllCarsParams]
	Page  uint `json:"offset" validate:"required"`
	Limit uint `json:"limit" validate:"required,lte=20"`
}

type GetAllCarsResponse struct {
	Cars []models.Car `json:"cars"`
}
