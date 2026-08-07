import { describe, test, assert } from "vitest";
import CarEntity from "./Car.js";

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
    t.expect(car.id).toBeTruthy();
    t.expect(car.model).toBeTruthy();
    t.expect(car.brand).toBeTruthy();
  });

  test("zero price", (t) => {
    const input = {
      model: "Monza",
      brand: "Chevrolet",
      year: 2014,
      price: 0,
    };

    t.expect(() => CarEntity.create(input)).toThrow();
  });

  test("negative price", (t) => {
    const input = {
      model: "Monza",
      brand: "Chevrolet",
      year: 2014,
      price: -10,
    };

    t.expect(() => CarEntity.create(input)).toThrow();
  });
});
