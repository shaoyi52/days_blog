const path = require('path');//加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  mode: 'production',//生产模式
  entry:'./src/index.js',//入口文件
  output:{//出口文件
    path:__dirname,
    filename:'./dist/index.js'
  },
  module:{//加载模块
    rules:[{
      test:/\.js$/,//.js文件加载loader
      include:path.resolve(__dirname,"./src"), //检查的文件夹
      exclude:path.resolve(__dirname,"./node_modules"),//不检查的文件夹
      loader:'babel-loader'//使用loader
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]

}