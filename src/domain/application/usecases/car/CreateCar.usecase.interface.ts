import type { CarProps } from "../../../entities/car/Car.js";
import type { IUseCase } from "../Usecase.interface.js";

export type CreateCarInput = CarProps;
export type CreateCarOutput = {}

export interface ICreateCarUseCase extends IUseCase<CreateCarInput, CreateCarOutput> { }
