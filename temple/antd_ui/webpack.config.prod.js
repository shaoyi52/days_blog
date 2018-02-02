/*
 * @file webpack配置文件(开发环境)
 * @author tanjizhen
 * @date 2017-04-30
 */
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'sourceMap',
    entry: {

        bundle: './app/main.jsx',
        vendor: ['babel-polyfill','react', 'react-dom', 'jquery', 'react-router', 'redux'],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
    resolve: {
        //extensions: ['.js', '.jsx'],
         modules: [
          "node_modules",
          path.resolve(__dirname, "app")
        ],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {   test: /\.svg/, 
                use: 'svg-url-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {   test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit:8192
                    }
                }]
            }
        ],
    },
    plugins: [
        ["import", { "libraryName": "antd", "style": true }],
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
        }),
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          minimize: true,
          compress: {warnings: false},
          output: {comments: false},
        }),
        new HtmlWebpackPlugin()
    ]

};