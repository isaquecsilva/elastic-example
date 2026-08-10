import type { ICarExecuteRepository } from "../../../../infra/repositories/CarRepository.interface.js";
import CarEntity from "../../../entities/car/Car.js";
import type {
  CreateCarInput,
  CreateCarOutput,
  ICreateCarUseCase,
} from "./CreateCar.usecase.interface.js";

export class CreateCarUseCase implements ICreateCarUseCase {
  constructor(
    private readonly carRepo: ICarExecuteRepository,
    private readonly carIndex: ICarExecuteRepository,
  ) {}

  public async execute(input: CreateCarInput): Promise<CreateCarOutput> {
    const car = CarEntity.create(input);
    const id = await this.carRepo.save(car);
    await this.carIndex.save(car);
    return id;
  }
}
