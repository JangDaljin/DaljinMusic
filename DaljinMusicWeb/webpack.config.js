const path = require("path");

module.exports = {
  entry: {
      "index": "./src/index.js",
      "music": "./src/music.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname + "/build")
  },
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: "8888"
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ['babel-loader'],
      },
      {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
      }
    ]
  }
};