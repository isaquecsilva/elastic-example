import type CarEntity from "../../domain/entities/car/Car.js";

export interface FindInput {
  model?: string;
  brand?: string;
  year?: number;
  priceRange?: {
    min: number;
    max: number;
  },
  limit: number;
}

export interface ICarRepository extends ICarQueryRepository, ICarExecuteRepository {}

export interface ICarQueryRepository {
  find(input: FindInput): Promise<CarEntity[]>;
  findById(carId: string): Promise<CarEntity>;
}

export interface ICarExecuteRepository {
  save(car: CarEntity): Promise<string>;
  remove(carId: string): Promise<void>;
}
