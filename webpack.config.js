const path = require('path');

module.exports = {
  entry: "./dev/script/index.js",
  // 'development' or 'production'
  mode: 'production',

  devServer: {
    static: {
      directory: path.join(__dirname, "build")
    },
    port: 9000,
  },

  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    publicPath: "/build/"
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