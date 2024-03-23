import { Config } from '@jest/types'

/**
 * Converts paths defined in tsconfig.json to the format of
 * moduleNameMapper in jest.config.js.
 *
 * For example, {'@alias/*': [ 'path/to/alias/*' ]}
 * Becomes {'@alias/(.*)': [ '<rootDir>/path/to/alias/$1' ]}
 *
 * @param {string} srcPath
 * @param {string} tsconfigPath
 */
function makeModuleNameMapper(srcPath: string, tsconfigPath: string): { [key: string]: string } {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions

  const aliases: { [key: string]: string } = {}

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '/(.*)')
    const path = paths[item][0].replace('/*', '/$1')
    aliases[key] = srcPath + '/' + path
  })
  return aliases
}

const TS_CONFIG_PATH = './tsconfig.json'
const SRC_PATH = '<rootDir>/src'

const config: Config.InitialOptions = {
  roots: [SRC_PATH],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
}

export default config
