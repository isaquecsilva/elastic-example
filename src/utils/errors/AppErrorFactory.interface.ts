import type { IAppError } from "./AppError.interface.js";

export enum ApplicationType {
  WEBAPI,
}

export interface IAppErrorFactoryFactory {
  create(appType: ApplicationType): BaseAppErrorFactory;
}

export interface IAppErrorFactory {
  new (): any;
  createInternalServerError(message: string): IAppError;
  createBadRequestError(message: string): IAppError;
  createUnprocessableEntityError(message: string): IAppError;
  createForbiddenError(message: string): IAppError;
  createUnsupportedMediaTypeError(message: string): IAppError;
}

export abstract class BaseAppErrorFactory {
  createInternalServerError(message: string): IAppError {
    return {} as IAppError;
  }

  createBadRequestError(message: string): IAppError {
    return {} as IAppError;
  }

  createUnprocessableEntityError(message: string): IAppError {
    return {} as IAppError;
  }

  createForbiddenError(message: string): IAppError {
    return {} as IAppError;
  }

  createUnsupportedMediaTypeError(message: string): IAppError {
    return {} as IAppError;
  }
}
