import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../../app/domain/error/custom.error'
import { MiddlewareInterface } from '@domain/contract/http-router.contract'

export const serverErrorMiddleware: MiddlewareInterface<
  [err: Error, req: Request, res: Response, next: NextFunction]
> = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const statusCode: number = err.statusCode || 500
    const message: string = err.message
    const stackError = err.stack

    res.status(statusCode).json({
      error: {
        name: err.name,
        message: message,
        statusCode: statusCode,
        info: err.errorProps,
        stack: stackError,
      },
    })
  } else {
    res.status(500).json({
      error: {
        name: 'ServerError',
        message: err.message || 'Internal Server Error',
        statusCode: 500,
        info: {},
        stack: err.stack,
      },
    })
  }
  next()
}
