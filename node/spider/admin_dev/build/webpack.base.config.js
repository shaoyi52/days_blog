const path = require("path");
const os = require("os");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require("happypack");
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  entry: {
    main: "@/main.js",
    "vender-base": "@/vendors/vendors.base.js",
    "vender-exten": "@/vendors/vendors.exten.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist/dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: "vue-style-loader!css-loader",
            less: "vue-style-loader!css-loader!less-loader"
          },
          postLoaders: {
            html: "babel-loader"
          }
        }
      },
      {
        test: /iview\/.*?js$/,
        loader: "happypack/loader?id=happybabel",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "happypack/loader?id=happybabel",
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "happypack/loader?id=happybabel"
      },
      {
        test: /\.(less|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024"
      },
      {
        test: /\.(html|tpl)$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: "happybabel",
      loaders: ["babel-loader"],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": resolve("../src"),
      util: path.resolve("src/libs/util"),
      config: path.resolve("src/libs/config"),
      modal: path.resolve("src/modal")
    }
  },
  devServer: { historyApiFallback: { index: "index.html" } }
};
