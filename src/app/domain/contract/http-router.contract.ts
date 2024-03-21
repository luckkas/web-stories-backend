import { HttpMethod } from './http-server.contract'

export interface HttpRouterInterface {
  init(routes: RouteConfigInterface[]): void
}

export interface MiddlewareInterface<T extends unknown[]> {
  (...args: T): unknown | void
}

export interface RouteConfigInterface {
  method: HttpMethod
  url: string
  controller: ControllerInterface
}

export interface UseCaseInterface {
  execute(props?: unknown): unknown
}

export interface ControllerInterface {
  handle(props?: unknown): Promise<unknown>
}
