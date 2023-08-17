
const path = require('path')
//引入vue-loader
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    //入口文件需要将每个模块都单独打包，用于做极致的按需组件系统
    index: './src/index.js',
    button:'./packages/button',
    aside:'./packages/aside',
    main:'./packages/main',
    header:'./packages/header',
    container:'./packages/container',
  },
  output: {
    // 设置生成的文件名
    filename: '[name].js',
    // 设置构建的组件库放在组件库的lib文件夹中
    path: path.resolve(__dirname, 'lib'),
    library:{
      // 声明组件库的全局对象名称为PUI
      name:'PUI',
      //　声明当前的导出模块为umd模块保证在任何模块场景都可以顺利加载
      type:'umd'
    },
    // 开启构建清理
    clean: true
  }, 
  module: {
    rules: [
      //追加vue-loader的应用
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      /* {
        test: /\.scss$/,
        use:[ {
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        },{
          loader: 'sass-loader'
        }]
      } */
    ]
  },
  // 排除vue注入
  externals:["vue"],
  plugins: [
    new VueLoaderPlugin()    
  ]
}