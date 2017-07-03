var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')
var distDir = path.join(__dirname, '../dist')

var outputFile = 'vue-instant'
var globalName = 'VueInstant'

module.exports = merge(base, {
  output: {
    path: distDir,
    filename: outputFile + '.common.js',
    library: 'vue-instant',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: {
    vue: 'vue',
    'vue-clickaway': 'vue-clickaway' // use package (?)
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
})
