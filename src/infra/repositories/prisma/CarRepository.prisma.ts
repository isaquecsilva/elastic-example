import type CarEntity from "../../../domain/entities/Car.js";
import type { ID } from "../../../domain/entities/Types.js";
import type { PrismaClient } from "../../../generated/prisma/client.js";
import type { FindInput, ICarRepository } from "../CarRepository.interface.js";

class PrismaCarRepository implements ICarRepository {
  constructor(private readonly conn: PrismaClient) { }

  public async findById(carId: ID): Promise<CarEntity> {
    const car = await this.conn.car.findFirst({
      where: { id: carId }
    })

    return car as CarEntity
  }

  public async find(input: FindInput): Promise<CarEntity[]> {
    const { model, brand, year, limit } = input;

    const where: Omit<FindInput, "priceRange"> & { price?: { gte: number; lte: number; } } = {
      model, brand, year, limit
    };

    if (input?.priceRange) {
      where.price = {
        gte: input.priceRange.min ?? 0,
        lte: input.priceRange.max ?? 0,
      }
    }

    const cars = await this.conn.car.findMany({
      where, take: Math.min(Math.max(0, limit), 20),
    });

    return cars as CarEntity[];
  }

  public async save(car: CarEntity): Promise<ID> {
    const { id, model, brand, year, price } = car;

    const carData = await this.conn.car.create({
      data: {
        id,
        model,
        brand,
        year,
        price,
      }
    })

    return carData.id
  }

  public async remove(carId: ID): Promise<void> {
    await this.conn.car.delete({ where: { id: carId } });
  }
}

export default PrismaCarRepository;
