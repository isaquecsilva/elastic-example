import { Client } from "@elastic/elasticsearch";
import type { ICarExecuteRepository } from "../CarRepository.interface.js";
import type CarEntity from "../../../domain/entities/Car.js";
import type { ID } from "../../../domain/entities/Types.js";

class ElasticSearchCarExecuteRepository implements ICarExecuteRepository {
  constructor(
    private readonly client: Client,
    private readonly index: string,
  ) { }

  public async save(car: CarEntity): Promise<ID> {
    const { id, model, brand, year, price } = car;

    await this.client.index({
      index: this.index,
      id: id,
      document: {
        id,
        model,
        brand,
        year,
        price,
        createdAt: car.createdAt,
        updatedAt: car.updatedAt,
      }
    });

    return car.id;
  }

  public async remove(carId: ID): Promise<void> {
    await this.client.delete({ id: carId, index: this.index })
  }
}

export default ElasticSearchCarExecuteRepository;
