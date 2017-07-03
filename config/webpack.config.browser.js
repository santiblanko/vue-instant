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
    filename: outputFile + '.browser.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  externals: {
    vue: 'vue',
    'vue-clickaway': 'VueClickaway' // use global variable VueClickaway (https://webpack.github.io/docs/library-and-externals.html)
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
