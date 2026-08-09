import type { IAppError } from "../../apperror/AppError.interface.js";
import { BaseAppErrorFactory } from "../AppErrorFactory.interface.js";
import HttpAppError from "../../apperror/HttpAppError.js";

export class HttpAppErrorFactory extends BaseAppErrorFactory {
  public createInternalError(message: string): IAppError {
    return new HttpAppError(message, 500);
  }

  public createBadRequestError(message: string): IAppError {
    return new HttpAppError(message, 400);
  }

  public createUnsupportedMediaTypeError(message: string): IAppError {
    return new HttpAppError(message, 415);
  }

  public createNotFoundError(message: string): IAppError {
    return new HttpAppError(message, 404);
  }

  public createForbiddenError(message: string): IAppError {
    return new HttpAppError(message, 403);
  }

  public createUnprocessableEntityError(message: string): IAppError {
    return new HttpAppError(message, 422);
  }
}
