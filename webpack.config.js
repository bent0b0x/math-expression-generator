const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",

        options: {
          plugins: ["syntax-dynamic-import"],

          presets: [
            [
              "env",
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      },
      {
        include: [path.resolve(__dirname, "src")],
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  mode: "production",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
};
