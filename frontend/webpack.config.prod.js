const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  devtool: "source-map",
  optimization: {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [new TerserPlugin()],
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [{ loader: "file-loader" }],
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
    chunkFilename: "[name].[contenthash].js",
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
        { from: "./public/android-chrome-192x192.png", to: "." },
        { from: "./public/manifest.json", to: "." },
      ],
    }),
  ],
};
