export abstract class CustomError<T> extends Error {
  public statusCode = 500
  public message = 'Unexpected error'
  public name = 'InternError'
  public stack?: string
  readonly errorProps: T

  constructor(name: string, message: string, statusCode: number, errorInfo: T) {
    super(message)
    this.errorProps = errorInfo
    this.statusCode = statusCode
    this.message = message
    this.name = name

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract errorInfo(): T
}
