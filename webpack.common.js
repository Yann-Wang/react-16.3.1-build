const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/, // 非项目打包逻辑，都要增加
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin()
  ]
}
