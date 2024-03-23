import {
  HttpRouterInterface,
  RouteConfigInterface,
} from '../../app/domain/contract/http-router.contract'
import { HttpServerInterface } from '../../app/domain/contract/http-server.contract'

export class HttpRouter implements HttpRouterInterface {
  private httpServerInstance: HttpServerInterface

  constructor(httpServerInstance: HttpServerInterface) {
    this.httpServerInstance = httpServerInstance
  }

  init(routes: RouteConfigInterface[]): void {
    for (const route of routes) {
      this.httpServerInstance.on(route.method, route.url, async (params: unknown) => {
        const controller = route.controller
        return await controller.handle(params)
      })
    }
  }
}
