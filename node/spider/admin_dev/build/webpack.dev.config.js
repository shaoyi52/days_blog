const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");
const package = require("../package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
fs.open("./build/env.js", "w", function(err, fd) {
  const buf = 'export default "development";';
  // fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
  fs.write(fd, buf, 0, "utf-8", function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: "#source-map",
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: "提莫淘书后台管理系统",
      filename: "../index.html",
      inject: false
    }),
    new CopyWebpackPlugin(
      [
        {
          from: "src/views/main-components/theme-switch/theme"
        },
        {
          from: "src/views/home/tinymce"
        }
      ],
      {
        ignore: ["text-editor.vue"]
      }
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        splitChunks: {
          cacheGroups: {
            common: {
              chunks: "initial",
              name: "testCommon", // 打包后的文件名
              minSize: 0,
              minChunks: 2 // 重复2次才能打包到此模块
            },
            vendor: {
              priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
              test: /node_modules/, // 匹配对应文件
              chunks: "initial",
              name: "testVendor",
              minSize: 0,
              minChunks: 1
            }
          }
        }
      }
    })
  ],
  devServer: {
    //contentBase: "./dist/",
    proxy: {
      "/v1": {
        target: "http://localhost:3000",
        pathRewrite: { "^/v1": "" }
      }
    }
  }
});
