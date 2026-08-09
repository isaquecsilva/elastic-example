import { describe, test } from 'vitest'
import { AppErrorFactoryFactory } from './AppErrorFactoryFactory.js'
import { HttpAppErrorFactory } from './http/HttpAppErrorFactory.js'
import { ApplicationType as AppType } from '../../../enums/apptype.js';

describe('test suite for AppErrorFactoryFactory', () => {
  test('shall return a http app error factory class', t => {
    const factory = AppErrorFactoryFactory.get(AppType.WEBAPI);
    t.expect(factory).not.toBeUndefined();
    t.expect(factory).toBeInstanceOf(HttpAppErrorFactory)
  });
})
