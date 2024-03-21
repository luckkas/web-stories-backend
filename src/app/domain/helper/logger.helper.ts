export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogOptions {
  level?: LogLevel
  error?: unknown
}

/**
 * Local function to create logs considering the requirements of consistency and readability.
 * @param className Name of the class using the logger
 * @param message Custom message of the error
 * @param options Object with available options
 */
export function logger(
  className: string,
  message: string,
  options: LogOptions = { level: LogLevel.INFO },
): void {
  const { level } = options
  const logLevel = level ? level : LogLevel.INFO

  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${className.toUpperCase()}]: ${message}`
  const error = options.error ?? ''

  switch (logLevel) {
    case LogLevel.DEBUG:
      console.debug(logMessage, error)
      break
    case LogLevel.INFO:
      console.info(logMessage, error)
      break
    case LogLevel.WARN:
      console.warn(logMessage, error)
      break
    case LogLevel.ERROR:
      console.error(logMessage, error)
      break
    default:
      console.log(logMessage, error)
      break
  }
}
