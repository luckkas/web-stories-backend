import { CustomError } from './custom.error'

export type ErrorProps = {
  data?: unknown | null
}

export class GenericError extends CustomError<ErrorProps> {
  constructor(name: string, message: string, statusCode?: number, props?: ErrorProps) {
    super(name, message ?? 'Internal Server Error', statusCode ?? 500, props ?? {})
  }

  errorInfo(): ErrorProps {
    return {
      data: this.errorProps.data,
    }
  }
}
