import type { ICarExecuteRepository } from "../../../../infra/repositories/CarRepository.interface.js";
import CarEntity from "../../../entities/Car.js";
import type { CreateCarInput, CreateCarOutput, ICreateCarUseCase } from "./CreateCar.usecase.interface.js";

export class CreateCarUseCase implements ICreateCarUseCase {
  constructor(
    private readonly carRepo: ICarExecuteRepository,
    private readonly carIndex: ICarExecuteRepository,
  ) { }

  public async execute(input: CreateCarInput): Promise<CreateCarOutput> {
    throw new Error('Not implemented');
  }
}
