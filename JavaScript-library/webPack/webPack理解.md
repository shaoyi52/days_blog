webPack理解
==
> create by **yuzhoufen** on **2020-03-03 17:20**
## 构建作用
>构建工具就是将源代码转换成可执行的 JavaScript、CSS、HTML 代码，包括以下内容： 
- [ ] 代码转换
  - [x] 将 ES 编译成 JavaScript、将 SCSS 编译成 CSS 等
  - [ ] 将 TypeScript 编译成 JavaScript
- [ ] 文件优化:压缩 JavaScript、CSS、HTML 代码，压缩合并图片等；
- [ ] 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码，让其异步加载；
- [ ] 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件；
- [x] 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器；
- [ ] 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过；
- [ ] 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统；

## 核心概念
> Webpack 有以下几个核心概念：
1. Entry ：入口，Webpack 执行构建的第一步将从 entry 开始，可抽象成输入；
2. Module：模块，配置处理模块的规则；在 Webpack 里一切皆模块，一个模块对应一个文件；Webpack 会从配置的 
 Entry 开始递归找出所有依赖的模块；
3. Loader：模块转换器，用于将模块的原内容按照需求转换成新内容；
4. Resolve：配置寻找模块的规则；
5. Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播对应的事件，插件可以监听这些事情的发生，在特定的时机做对应的事情；
6. Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果；
7. Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割；
## 流程概述

## 前置知识
----
## webpack 配置
1. 安装
* npm i -D [安装包] ||（npm install [安装包]  --save-dev）//安装包写到devDependencies

2. 使用
3. Loader 配置

4. Plugin 配置

### .babelrc
处理一下ES6,以及js文件的webpack的loader配置
> 装babel-loader8.0.0 报错,心态都搞崩了,所以这里我使用的是7版本
```
npm install babel-loader@7 babel-core babel-preset-env -D
```
在webpack.config.base.js>module>rules里面添加代码
```
{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
}
```
新建文件 .babelrc
```
{
  "presets": [
    "env"
  ]
}
```