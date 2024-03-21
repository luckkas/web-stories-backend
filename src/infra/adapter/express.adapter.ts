import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express'
import compression from 'compression'
import cors from 'cors'
import { serverErrorMiddleware } from '@infra/api/middleware/server-error.middleware'
import {
  HttpCallbackInterface,
  HttpMethod,
  HttpResponseInterface,
  HttpServerInterface,
} from '@domain/contract/http-server.contract'
import { logger } from '@domain/helper/logger.helper'

export class ExpressAdapter implements HttpServerInterface {
  private expressInstance: Express
  private router: Router

  constructor() {
    this.expressInstance = express()
    this.router = Router()
    this.expressInstance.use(express.json())
    this.expressInstance.use(express.urlencoded())
    this.expressInstance.use(compression())
    this.expressInstance.use(cors())
    this.expressInstance.use(this.router)
    this.expressInstance.use(serverErrorMiddleware)
  }

  on(method: HttpMethod, url: string, callback: HttpCallbackInterface): void {
    this.router[method](
      url,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const requestCustom: Record<string, string> = {
            ...req.params,
            ...req.query,
            ...req.body,
          }

          const output = await callback(requestCustom)

          const response: HttpResponseInterface = {
            statusCode: res.statusCode,
            message: res.statusMessage,
            response: output,
          }

          return res.json(response)
        } catch (error) {
          next(error)
        }
      },
    )
  }

  listen(port: number): void {
    logger('ExpressAdapter', `Listening on port ${port}`)
    this.expressInstance.listen(port)
  }
}
