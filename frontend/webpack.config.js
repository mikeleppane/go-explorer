const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "eval-source-map",
  optimization: {
    splitChunks: { chunks: "all" },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new Dotenv(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/favicon.ico", to: "." },
        { from: "./public/manifest.json", to: "." },
      ],
    }),
  ],
};