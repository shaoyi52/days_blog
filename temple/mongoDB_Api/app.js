var express = require('express');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser=require('body-parser');
//加载express模块
var app = express();

//import handleRender from './modules/render';


//bodyparse设置
app.use(bodyParser.urlencoded({extended:true}));


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
  console.log('Example app listening at http://%s:%s', host, port);
});