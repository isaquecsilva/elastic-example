import CarEntity from "./domain/entities/car/Car.js";
import { appErrorFactory } from "./utils/errors/factories/AppErrorFactoryFactory.js";

const car = CarEntity.create({
  model: "Monza",
  brand: "Chevrolet",
  year: 2015,
  price: 8299,
});

console.log(car);

const { code, message } = appErrorFactory.createUnprocessableEntityError('Request cannot be processed now.');


console.table({
  code,
  message,
})
