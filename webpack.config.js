const path = require('path');

module.exports = {
  entry: {
    main: './dev/script/index.js',
    pageTest: './dev/script/pages/experiments/pageTest.js',
  },

  // 'development' or 'production'
  mode: 'production',

  devServer: {
    static: {
      directory: path.join(__dirname, "build")
    },
    port: 9000,
  },

  output: {
    path: path.resolve(__dirname, "./build/assets/script"),
    filename: "[name].bundle.js",
    // publicPath: path.resolve(__dirname, 'build/assets/script/')
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
      }
    ]
  },

  plugins: []
};