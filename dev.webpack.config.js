module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    publicPath: '/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'stage-0', 'react']
        }
      }
    ]
  }
};
