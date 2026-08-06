import CarEntity from "./domain/entities/car.js";

const car = CarEntity.create({
  model: "Monza",
  brand: "Chevrolet",
  year: 2015,
  price: 8299,
});

console.log(car);
