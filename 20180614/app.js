var express = require('express');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser=require('body-parser');
//加载express模块
var app = express();

//import handleRender from './modules/render';

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');    
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    
    next();
});


//bodyparse设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//根据功能划分模块
app.use('/api',require('./modules/api'));
//app.use('*',handleRender);

mongoose.connect('mongodb://localhost:27017/test',function(err){
    if(err){
        console.log("数据库连接失败");
    }else{
        console.log("数据库连接成功");
    }
});


var server = app.listen(3000, function () {
  var host = server.address();
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});