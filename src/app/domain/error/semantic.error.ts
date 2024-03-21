import { StatusCode } from '../contract/http-server.contract'
import { CustomError } from './custom.error'
import { ErrorProps } from './generic.error'

const DefaultErrorNames: Record<StatusCode, string> = {
  [StatusCode.SUCCESS]: 'Success',
  [StatusCode.BAD_REQUEST]: 'BadRequest',
  [StatusCode.UNAUTHORIZED]: 'Unauthorized',
  [StatusCode.FORBIDDEN]: 'Forbidden',
  [StatusCode.NOT_FOUND]: 'NotFound',
  [StatusCode.INTERNAL_SERVER_ERROR]: 'InternalServerError',
}

export class SemanticError extends CustomError<ErrorProps> {
  constructor(statusCode: StatusCode, message?: string) {
    const stackInfo = new Error().stack
    super(
      DefaultErrorNames[statusCode],
      message ?? DefaultErrorNames[statusCode],
      statusCode,
      stackInfo as ErrorProps,
    )
  }
  errorInfo(): ErrorProps {
    return {
      data: this.errorProps.data,
    }
  }
}

export class BadRequestError extends SemanticError {
  constructor(message: string = 'Bad Request') {
    super(400, message)
  }
}

export class UnauthorizedError extends SemanticError {
  constructor(message: string = 'Unauthorized') {
    super(401, message)
  }
}

export class ForbiddenError extends SemanticError {
  constructor(message: string = 'Forbidden') {
    super(403, message)
  }
}

export class NotFoundError extends SemanticError {
  constructor(message: string = 'Not Found') {
    super(404, message)
  }
}

export class InternalServerError extends SemanticError {
  constructor(message: string = 'Internal Server Error') {
    super(500, message)
  }
}
