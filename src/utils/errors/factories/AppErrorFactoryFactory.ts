import { ApplicationType } from "../../../enums/apptype.js";
import type { BaseAppErrorFactory } from "./AppErrorFactory.interface.js";
import { HttpAppErrorFactory } from "./http/HttpAppErrorFactory.js";

export class AppErrorFactoryFactory {
  public static get(_: ApplicationType): BaseAppErrorFactory {
    // When having more application types
    // im going to use a switch statement to decide which
    // factory to retrieve.
    return new HttpAppErrorFactory();
  }
}

export const appErrorFactory = AppErrorFactoryFactory.get(ApplicationType.WEBAPI);
