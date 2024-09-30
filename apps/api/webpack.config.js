const { NxWebpackPlugin } = require('@nx/webpack')
const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api')
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      optimization: false,
      outputHashing: 'none'
    })
  ],
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },

}