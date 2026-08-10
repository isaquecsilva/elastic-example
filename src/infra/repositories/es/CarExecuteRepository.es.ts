import { Client } from "@elastic/elasticsearch";
import type { ICarExecuteRepository } from "../CarRepository.interface.js";
import type CarEntity from "../../../domain/entities/car/Car.js";

class ElasticSearchCarExecuteRepository implements ICarExecuteRepository {
  constructor(
    private readonly client: Client,
    private readonly index: string,
  ) {}

  public async save(car: CarEntity): Promise<string> {
    await this.client.index({
      index: this.index,
      id: car.getId(),
      document: {
        id: car.getId(),
        model: car.getModel(),
        brand: car.getBrand(),
        year: car.getYear(),
        price: car.getPrice(),
        createdAt: car.getCreatedAt(),
        updatedAt: car.getUpdatedAt(),
      },
    });

    return car.getId();
  }

  public async remove(carId: string): Promise<void> {
    await this.client.delete({ id: carId, index: this.index });
  }
}

export default ElasticSearchCarExecuteRepository;
