import type { IAppError } from "./AppError.interface.js";
import { BaseAppErrorFactory, type IAppErrorFactory } from "./AppErrorFactory.interface.js";
import HttpAppError from "./HttpAppError.js";

export class HttpAppErrorFactory extends BaseAppErrorFactory {
  public static createInternalServerError(message: string): IAppError {
    return new HttpAppError(message, 500);
  }

  public static createBadRequestError(message: string): IAppError {
    return new HttpAppError(message, 400);
  }

  public static createUnsupportedMediaTypeError(message: string): IAppError {
    return new HttpAppError(message, 415);
  }

  public static createNotFoundError(message: string): IAppError {
    return new HttpAppError(message, 404);
  }

  public static createForbiddenError(message: string): IAppError {
    return new HttpAppError(message, 403);
  }

  public static createUnprocessableEntityError(message: string): IAppError {
    return new HttpAppError(message, 422);
  }
}
