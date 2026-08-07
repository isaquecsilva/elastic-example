import { describe, test } from 'vitest'
import { HttpAppErrorFactory } from './HttpAppErrorFactory.js'

describe('http app error factory test suite', () => {
  test('internal server error', (t) => {
    const appError = HttpAppErrorFactory.createInternalServerError('internal error')
    t.expect(appError.code).toBe(500);
    t.expect(appError.message).toBe('internal error')
  })

  test('bad request error', (t) => {
    const appError = HttpAppErrorFactory.createBadRequestError('bad request error')
    t.expect(appError.code).toBeTruthy();
    t.expect(appError.code).toBe(400)
    t.expect(appError.message).toBe('bad request error')
  })

  test('not found error', (t) => {
    const appError = HttpAppErrorFactory.createNotFoundError('not found error')
    t.expect(appError.code).toBeTruthy();
    t.expect(appError.code).toBe(404)
    t.expect(appError.message).toBe('not found error')
  })

  test('forbidden error', (t) => {
    const appError = HttpAppErrorFactory.createForbiddenError('forbidden error')
    t.expect(appError.code).toBeTruthy();
    t.expect(appError.code).toBe(403)
    t.expect(appError.message).toBe('forbidden error')
  })

  test('unprocessable entity error', (t) => {
    const appError = HttpAppErrorFactory.createUnprocessableEntityError('could not process request')
    t.expect(appError.code).toBe(422);
    t.expect(appError.message).toBe('could not process request')
  })

  test('unsupported media type error', (t) => {
    const appError = HttpAppErrorFactory.createUnsupportedMediaTypeError('unsupported media type')
    t.expect(appError.code).toBe(415);
    t.expect(appError.message).toBe('unsupported media type')
  })
})
