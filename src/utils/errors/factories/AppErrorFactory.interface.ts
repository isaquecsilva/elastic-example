import type { ApplicationType } from "../../../enums/apptype.js";
import type { IAppError } from "../apperror/AppError.interface.js";


export interface IAppErrorFactoryFactory {
  create(appType: ApplicationType): BaseAppErrorFactory;
}

export abstract class BaseAppErrorFactory {
  abstract createInternalError(message: string): IAppError;

  abstract createBadRequestError(message: string): IAppError;

  abstract createUnprocessableEntityError(message: string): IAppError;

  abstract createForbiddenError(message: string): IAppError;

  abstract createUnsupportedMediaTypeError(message: string): IAppError;
}
