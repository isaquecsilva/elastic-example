import CarEntity from "../../../domain/entities/car/Car.js";
import { ResourceNotFoundError } from "../../../domain/errors/BaseErrors.js";
import type { PrismaClient } from "../../../generated/prisma/client.js";
import type { FindInput, ICarRepository } from "../CarRepository.interface.js";

class PrismaCarRepository implements ICarRepository {
  constructor(private readonly conn: PrismaClient) {}

  public async findById(carId: string): Promise<CarEntity> {
    const car = await this.conn.car.findFirst({
      where: { id: carId },
    });

    if (!car) {
      throw new ResourceNotFoundError(`Car with id ${carId} not found`);
    }

    const carEntity = CarEntity.create({
      id: car.id,
      model: car.model,
      brand: car.brand,
      year: car.year,
      price: car.price,
    });

    return carEntity;
  }

  public async find(input: FindInput): Promise<CarEntity[]> {
    const { model, brand, year, limit } = input;

    const where: Omit<FindInput, "priceRange"> & {
      price?: { gte: number; lte: number };
    } = {
      model,
      brand,
      year,
      limit,
    };

    if (input?.priceRange) {
      where.price = {
        gte: input.priceRange.min ?? 0,
        lte: input.priceRange.max ?? 0,
      };
    }

    const cars = await this.conn.car.findMany({
      where,
      take: Math.min(Math.max(0, limit), 20),
    });

    const carsGroup = cars.map((car) =>
      CarEntity.create({
        id: car.id,
        model: car.model,
        brand: car.brand,
        year: car.year,
        price: car.price,
      }),
    );

    return carsGroup;
  }

  public async save(car: CarEntity): Promise<string> {
    const carData = await this.conn.car.create({
      data: {
        id: car.getId(),
        model: car.getModel(),
        brand: car.getBrand(),
        year: car.getYear(),
        price: car.getPrice(),
      },
    });

    return carData.id;
  }

  public async remove(carId: string): Promise<void> {
    await this.conn.car.delete({ where: { id: carId } });
  }
}

export default PrismaCarRepository;
