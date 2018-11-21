/* eslint: disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const publicPath = '/';
const srcPath = './src';


const webpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  entry: {
    index: [
      // 'react-hot-loader/patch',
      path.resolve(__dirname, path.resolve(srcPath, 'index.jsx'))
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
  ],
};


// webpackConfig.target = webpackTargetElectronRenderer(webpackConfig);

module.exports = webpackConfig;
