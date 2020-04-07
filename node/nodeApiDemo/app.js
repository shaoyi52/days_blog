global.__base = __dirname + '/'
const express = require('express'),
app = express();
let log = require('tracer').colorConsole();
const routeEach = require('./core/routeEach')
const tool = require("./tool/require.js");
let hostArr=["localhost:3000"]
app.all('*', function (req, res, next) {
    if (hostArr.indexOf(req.headers.host) == -1) {
        log.error(`${req.headers.host}在${new Date()}访问，已被拦截`);
        res.send("总有刁民想害朕，锦衣卫护驾");
    } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    }
});
app.use(express.json())//body-parser 解析json格式数据
app.use(express.urlencoded({extended: false})); //此项必须在 bodyParser.json 下面,为参数编码

// 字段不符合就就不允许
app.use((req, res, next) => {
    let limit = tool.getParams(req, 'limit');
    if(limit && limit > 200) {
        res.send(tool.toJson('', 'limit参数不能大于200', 1002));
    } else {
        next()
    }
})
routeEach(app);
app.use(function (req, res, next) {
    res.send("没有接口");
});

module.exports = app;