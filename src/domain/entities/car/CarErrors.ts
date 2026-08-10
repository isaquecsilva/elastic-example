import { BusinessRuleError } from "../../errors/BaseErrors.js";

export class InvalidCarPriceError extends BusinessRuleError {
  constructor(message: string = 'Car price must be greater than zero') {
    super(message);
  }
}
