import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import chalk from 'chalk';
import db from './mongodb/db.js';
//加载body-parser,用来处理post提交过来的数据
var bodyParser=require('body-parser');
//加载express模块
const app = express();

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://cangdu.org');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method == 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
});
//bodyparse设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);


app.listen(3800, () => {
  console.log(
    chalk.green(`成功监听端口：3800`)
  )
});