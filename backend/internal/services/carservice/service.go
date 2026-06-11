package carservice

import (
	"context"

	"github.com/isaquecsilva/elastic-example/backend/internal/models"
	"github.com/isaquecsilva/elastic-example/backend/internal/repositories"
)

var _ (ICarService) = (*CarServiceImpl)(nil)

type CarServiceImpl struct {
	repo repositories.ICarRepository
}

func NewCarServiceImpl(repo repositories.ICarRepository) *CarServiceImpl {
	return &CarServiceImpl{repo: repo}
}

func (s *CarServiceImpl) CreateCar(ctx context.Context, params CreateCarParams) (CreateCarResponse, error) {
	car := models.NewCar(params.Model, params.Brand, params.Year, params.Price)
	err := s.repo.CreateCar(ctx, car)

	if err != nil {
		return CreateCarResponse{}, err
	}

	return CreateCarResponse{Car: car}, nil
}

func (s *CarServiceImpl) GetCars(ctx context.Context, params GetCarsParams) (GetCarsResponse, error) {
	cars, err := s.repo.FindCarsWithFilters(ctx, repositories.FindCarsFilters{
		Model:     params.Model,
		Brand:     params.Brand,
		Year:      params.Year,
		Price:     params.Price,
		SortField: params.SortField,
		SortOrder: params.SortOrder,
	})

	if err != nil {
		return GetCarsResponse{}, err
	}

	return GetCarsResponse{Cars: cars}, nil
}

func (s *CarServiceImpl) GetAllCars(ctx context.Context, params GetAllCarsParams) (GetAllCarsResponse, error) {
	filters := repositories.FindAllCarsFilters{
		Offset: int(max(params.Page-1, 0) * params.Limit),
		Limit:  int(params.Limit),
	}

	cars, err := s.repo.FindAllCars(ctx, filters)

	if err != nil {
		return GetAllCarsResponse{}, err
	}

	return GetAllCarsResponse{Cars: cars}, nil
}
