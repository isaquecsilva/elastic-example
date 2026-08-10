import { randomUUIDv7 } from "crypto";
import { InvalidCarPriceError } from "./CarErrors.js";

export interface CarProps {
  model: string;
  brand: string;
  year: number;
  price: number;
}

class CarEntity {
  private readonly id: string

  private constructor(
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

  public static create({ model, brand, year, price }: CarProps) {
    return new CarEntity(model, brand, year, price);
  }

  private validate(): void {
    if (this.price <= 0) {
      throw new InvalidCarPriceError();
    }
  }
}

export default CarEntity;
