var path    = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'src/build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [ APP_DIR + '/main/main.jsx' ],
  output: {
    path: BUILD_DIR,
    publicPath: '/build',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      { 
        test: /\.png$/, 
        loader: "file-loader" 
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.json$/, loader: 'json-loader'},
    ]
  },
  devServer: {
    contentBase: APP_DIR,
    inline: true,
    stats: 'errors-only'
  }
};

module.exports = config;