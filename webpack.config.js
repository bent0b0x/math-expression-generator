const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.ts"
  },
  output: {
    library: "math-expression-generator",
    libraryTarget: "commonjs2"
  },
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
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: "./src/types/**/*.ts", to: "./types", flatten: true }
    ])
  ]
};
