import { randomUUID, randomUUIDv7 } from "crypto";
import BaseEntity from "./Base.js";
import type { ID } from "./Types.js";

export interface CarProps {
  model: string;
  brand: string;
  year: number;
  price: number;
}

class CarEntity extends BaseEntity {
  private readonly _id: ID

  private constructor(
    private readonly _model: string,
    private readonly _brand: string,
    private readonly _year: number,
    private readonly _price: number,
  ) {
    super();
    this._id = randomUUIDv7();
    this.validate();
  }

  public get id(): ID {
    return this._id;
  }

  public get model(): string {
    return this._model;
  }

  public get brand(): string {
    return this._brand;
  }

  public get year(): number {
    return this._year;
  }

  public get price(): number {
    return this._price;
  }

  public static create({ model, brand, year, price }: CarProps) {
    return new CarEntity(model, brand, year, price);
  }

  private validate(): void {
    if (this._price <= 0) {
      throw new Error('Car entity error: a car cannot have a zero or lower price.')
    }
  }
}

export default CarEntity;
