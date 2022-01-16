中铁康养
=======
## 简介


基于[uni-app](https://uniapp.dcloud.io)和[uviewui](https://www.uviewui.com)，结合 Vue 项目开发特点,使用 CLI 脚手架[搭建](https://uniapp.dcloud.io/quickstart-cli)的小程序项目

开发工具：vs code + 微信开发者工具 Stable 1.05+

开发模式: 使用 vscode 开发（实时编译），使用小程序开发者工具预览和调试

运行平台：weChat

---

## 前序准备

项目技术栈基于 [uni-app](https://uniapp.dcloud.net.cn/api/README)、[ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)

- [vue h5 转换 uni-app 指南](https://ask.dcloud.net.cn/article/36174)

- [框架学习](https://uniapp.dcloud.net.cn/frame)

- [开发规范](https://uniapp.dcloud.net.cn/frame?id=%e5%bc%80%e5%8f%91%e8%a7%84%e8%8c%83)

- [组件使用](https://www.uviewui.com/components/intro.html)

- [工具库使用](https://www.uviewui.com/js/intro.html)

- [接口文档](http://rap2.taobao.org/organization/repository/editor?id=287856)

- [产品原型](https://u.pmdaniu.com/58VVZ)

- [产品设计稿](https://lanhuapp.com/web/#/item/project/stage?pid=2d135644-d782-49f8-8e73-ac98e5d5e191)

**原型和设计稿存在出入时，请以原型为准，并与 PM 沟通确认**

**接口文档使用前，请先自行注册**


---

## 目录结构

```
┌—— components            符合vue组件规范的uni-app组件目录
├── api                   接口API
└── common
    ├── oss               # 单一图片上传，前端签名 不依赖后端
    ├── rsa               # RSA加密
    ├── request.js        # HTTP请求 get | post
    ├── utils.js          # 通用工具函数
    ├── webView.js        # web-view方案 兼容内部模块跳转(活动 | 社区资讯 | 服务商城)
    └── wxpayment.js      # wx支付
├── pages                 主包目录
├── static                静态资源（字体、图片、视频等）目录，注意：静态资源只能存放于此
└── subcontractor         分包目录
    ├── home              # 首页
    ├── pay               # 支付
    └── user              # 我的
├── store                 Vuex
├── uview-ui
├── settings.js           打包时的用户配置
├── uni.scss              scss变量预置
├── main.js
├── App.vue               预登录｜刷新用户信息｜更新公钥
├── manifest.json         配置应用名称、appid、logo、版本等打包信息
└── pages.json            uni-app应用的全局配置
```

---

## 安装依赖

```bash
# 安装依赖
npm install
```

---

## 运行

```bash
# 命令
  npm run serve // RAP模式 => 返回RAP2mock数据
  npm run serve:local // 本地模式 => 请求本地服务
  npm run serve:test // 本地模式 => 请求测试机数据

# 本地运行
# 请修改.env.devlocal 中的 VUE_APP_BASE_URL 为本地 IP


# 真机调试
# 请修改.env.devlocal 中的 VUE_APP_BASE_URL 为外网映射地址（可通过uTools等工具快速配置）
```

---

## 发布

```bash
# 体验版
npm run build:test

# 正式版
npm run build:prod
```
