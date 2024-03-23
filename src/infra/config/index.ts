import 'dotenv/config'
import { ConfigInterface } from './config.contract'

const applicationConfiguration: ConfigInterface = {
  nodePort: <number>Number(<string>process.env.NODE_PORT) || 2010,
  devMode: <boolean>(process.env.NODE_ENV !== 'production' || false),
  nodeEnv: <string>(process.env.NODE_ENV || ''),
  tokenExpirationTime: <string>(process.env.JWT_TOKEN_EXPIRATION)
}

export { applicationConfiguration }
