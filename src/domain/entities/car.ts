import BaseEntity from "./base.js";

export interface CarProps {
  model: string;
  brand: string;
  year: number;
  price: number;
}

class CarEntity extends BaseEntity {
  private constructor(
    private readonly model: string,
    private readonly brand: string,
    private readonly year: number,
    private readonly price: number,
  ) {
    super();
  }

  public static create({ model, brand, year, price }: CarProps) {
    return new CarEntity(model, brand, year, price);
  }
}

export default CarEntity;
