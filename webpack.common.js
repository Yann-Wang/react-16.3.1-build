const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        include: path.resolve(__dirname, 'src')
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    alias: {
      'events': path.resolve(__dirname, 'src/packages/events'),
      react: path.resolve(__dirname, 'src/packages/react'),
      'react-art': path.resolve(__dirname, 'src/packages/react-art'),
      'react-call-return': path.resolve(__dirname, 'src/packages/react-call-return'),
      'react-dom': path.resolve(__dirname, 'src/packages/react-dom'),
      'react-is': path.resolve(__dirname, 'src/packages/react-is'),
      'react-reconciler': path.resolve(__dirname, 'src/packages/react-reconciler'),
      shared: path.resolve(__dirname, 'src/packages/shared')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
}
