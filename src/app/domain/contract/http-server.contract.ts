export interface HttpResponseInterface {
  statusCode: number
  message: string
  response: unknown
}

export interface HttpRequestInterface {
  params?: unknown
  query?: unknown
  body?: unknown
}

export interface HttpCallbackInterface {
  (request: HttpRequestInterface): Promise<unknown>
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface HttpServerInterface {
  on(
    method: HttpMethod,
    url: string,
    callback: (req: HttpRequestInterface) => Promise<unknown>,
  ): void
  listen(port: number): void
}

export interface HttpAdapterInterface {
  request(
    url: string,
    method: HttpMethod,
    data?: Record<string, unknown>,
    headers?: Record<string, string>,
    auth?: unknown,
    params?: Record<string, string>,
  ): Promise<unknown>
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
