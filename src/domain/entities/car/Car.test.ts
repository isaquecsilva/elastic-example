import { describe, test, assert } from "vitest";
import CarEntity from "./Car.js";
import { InvalidCarPriceError } from "./CarErrors.js";

describe("Car entity test suite", () => {
  test("valid entity instance", (t) => {
    const input = {
      model: "Monza",
      brand: "Chevrolet",
      year: 2014,
      price: 12899,
    };

    const car = CarEntity.create(input);
    t.expect(car).toBeInstanceOf(CarEntity);
    t.expect(car.getId()).toBeTruthy();
    t.expect(car.getModel()).toBeTruthy();
    t.expect(car.getBrand()).toBeTruthy();
  });

  test("zero price", (t) => {
    const input = {
      model: "Monza",
      brand: "Chevrolet",
      year: 2014,
      price: 0,
    };

    t.expect(() => CarEntity.create(input)).toThrow(InvalidCarPriceError);
  });

  test("negative price", (t) => {
    const input = {
      model: "Monza",
      brand: "Chevrolet",
      year: 2014,
      price: -10,
    };

    t.expect(() => CarEntity.create(input)).toThrow(InvalidCarPriceError);
  });
});
