## react Start 分析

---

> create by **yuzhoufen** on **2020-10-19 17:20**

### node 当前进程 process

```
//set env
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
```

### 1.1 新建 WebpackDevServer

const devServer = new WebpackDevServer(compiler, serverConfig);

```
 const Webpack = require('webpack');
const WebpackDevServer = require('../../../lib/Server');
const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
  stats: {
    colors: true,
  },
});
const server = new WebpackDevServer(compiler, devServerOptions);

```

###　 1.2 启动 devServer

```
devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
    });
```
