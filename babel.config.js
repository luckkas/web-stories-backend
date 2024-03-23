module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './src/app',
          '@domain': './src/app/domain',
          '@modules': './src/app/modules',
          '@infra': './src/infra',
        },
      },
    ],
  ],
  ignore: ['src/**/*.spec.ts', 'src/**/test/*', 'src/**/*.test.ts', 'src/**/test.ts'],
}
