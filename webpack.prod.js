const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
