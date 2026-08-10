import { randomUUIDv7 } from "crypto";
import { InvalidCarPriceError } from "./CarErrors.js";

export interface CarProps {
  id?: string;
  model: string;
  brand: string;
  year: number;
  price: number;
}

class CarEntity {
  private readonly createdAt: Date = new Date();
  private readonly updatedAt: Date;

  private constructor(
    private readonly id: string,
    private readonly model: string,
    private readonly brand: string,
    private readonly year: number,
    private readonly price: number,
  ) {
    this.id = randomUUIDv7();
    this.validate();
  }

  public getId(): string {
    return this.id;
  }

  public getModel(): string {
    return this.model;
  }

  public getBrand(): string {
    return this.brand;
  }

  public getYear(): number {
    return this.year;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static create({ id, model, brand, year, price }: CarProps) {
    id = id ?? randomUUIDv7();
    return new CarEntity(id, model, brand, year, price);
  }

  private validate(): void {
    if (this.price <= 0) {
      throw new InvalidCarPriceError();
    }
  }
}

export default CarEntity;
