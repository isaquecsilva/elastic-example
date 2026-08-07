import type { IAppError } from "./AppError.interface.js";

class HttpAppError extends Error implements IAppError {
  public readonly code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code ?? 500;
  }
}

export default HttpAppError;
