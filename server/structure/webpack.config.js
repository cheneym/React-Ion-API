//This file configures webpack to run on the production files
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  entry: './src/js/App.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', {
        allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
