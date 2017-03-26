const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  eslint: {
    failOnWarning: false,
    failOnError: false,
  },
  resolve: {
    alias: {
      '~': path.resolve('./src'),
    },
  },
  module: {

// This is only for newer webpacks apparently
/*
   rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader'}]
      }

    ],
*/

    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'stage-0', 'react'],
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
          ],
        },
      },
    ],
    postLoaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot',
      },
    ],
  },
};
