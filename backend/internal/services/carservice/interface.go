package carservice

import "context"

type ICarService interface {
	CreateCar(ctx context.Context, car CreateCarParams) (CreateCarResponse, error)
	GetCars(ctx context.Context, params GetCarsParams) (GetCarsResponse, error)
	GetAllCars(ctx context.Context, params GetAllCarsParams) (GetAllCarsResponse, error)
}
