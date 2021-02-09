const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const basedir = path.resolve(__dirname)
const babelRc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'))

/** @type {webpack.Configuration} */
module.exports = {
  entry: path.join(basedir, 'src/cli/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /(node_modules|config|lib|bin|typings)/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              /node_modules[\\\/]core-js/,
              /node_modules[\\\/]webpack[\\\/]buildin/,
            ],
            ...babelRc.env['test']
          },
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(path.join(basedir, 'lib')),
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
  resolve: {
    alias: {
      '@config': path.resolve(basedir, 'config')
    },
    extensions: ['.ts', '.js', '.json']
  },
  target: 'node',
}