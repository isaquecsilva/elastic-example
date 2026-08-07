import { randomUUID } from 'crypto'
import type { ID } from './Types.js';

class BaseEntity {
  public constructor(
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {}

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }
}

export default BaseEntity;
