import { HttpRouterInterface } from '@domain/contract/http-router.contract'
import { logger, LogLevel } from '@domain/helper/logger.helper'
import { ExpressAdapter } from '@infra/adapter/express.adapter'
import { HttpRouter } from '@infra/api/http-router.api'
import { applicationConfiguration } from '@infra/config'
import { modulesRoutes } from '@modules/routes'

export class Application {
  private expressAdapter: ExpressAdapter
  private httpRouter: HttpRouterInterface

  constructor() {
    this.expressAdapter = new ExpressAdapter()
    this.httpRouter = new HttpRouter(this.expressAdapter)
  }

  start(): void {
    try {
      logger('Application', `Running on ${applicationConfiguration.nodeEnv} mode`, {
        level: LogLevel.INFO,
      })
      this.expressAdapter.listen(applicationConfiguration.nodePort)
      this.httpRouter.init(modulesRoutes)
    } catch (error: unknown) {
      logger('Application', `Error on start application: ${error}`, {
        level: LogLevel.ERROR,
      })
    }
  }
}
