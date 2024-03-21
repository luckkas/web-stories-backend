import 'dotenv/config'
import { ConfigInterface } from './config.contract'

const applicationConfiguration: ConfigInterface = {
  nodePort: <number>Number(<string>process.env.NODE_PORT) || 2010,
  devMode: <boolean>(process.env.NODE_ENV !== 'production' || false),
  nodeEnv: <string>(process.env.NODE_ENV || ''),
}

export { applicationConfiguration }
