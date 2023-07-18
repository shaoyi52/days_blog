/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2020-02-16 12:37:36
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 10:18:27
 * @FilePath: \spider\adminApi\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
global._base = __dirname + "/"; //设置全局requir目录前缀
const express = require("express"),
  app = express();
let compress = require("compression"); //gzip压缩
app.use(compress());
const routeEach = require("./core/routeEach");
const hostArr = require("../common/host"); //允许访问的域名
const { fs, path, tool, log } = require("./tool/require");

app.all("*", function (req, res, next) {
  if (hostArr.indexOf(req.headers.host) == -1) {
    //log.error(`${req.headers.host}在${new Date().Format()}访问，已被拦截`);
    res.send("总有刁民想害朕，锦衣卫护驾");
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  }
});

//morgan(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 字段不符合就就不允许
app.use((req, res, next) => {
  let limit = tool.getParams(req, "limit");
  if (limit && limit > 200) {
    res.send(tool.toJson("", "limit参数不能大于200", 1002));
  } else {
    next();
  }
});
/*
app.use("/a", function(req, res, next) {
  console.log("111");
  next();
});
app.all("/a/b", function(req, res, next) {
  console.log("222");
  res.end("执行完毕");
});
app.all("/c/b", function (req, res, next) {
  console.log("33");
  res.end("执行完毕c b");
});*/
routeEach(app);

module.exports = app;

//捕获node异常  不允许退出
process.on("uncaughtException", function (err) {
  console.log("api异常退出被捕获了");
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});
