const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/clipboard.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clipboard.js',
    library: 'ClipboardJS',
    libraryTarget: 'umd',
    libraryExport: 'default',
    auxiliaryComment: "umd comment"
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
}

module.exports = config;