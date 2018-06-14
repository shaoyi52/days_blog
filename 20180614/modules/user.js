var express = require('express');
var mongoose = require('mongoose');
var app = express();
 mongoose.connect('mongodb://localhost/test');


/*app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});*/
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  console.log("get");   
  res.send('Hello World!');
});

//网站首页接受POST请求
app.post('/',function(req,res){
  res.send('GOT a POST request');
});
// /user节点接受 put 请求
app.put('/user',function(req,res){
  res.send('Got a PUT request at /user'+req);
});

// /user 节点接受 DELETE 请求
app.delete('/user',function(req,res){
  res.send('Got a DELETE at /user');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});
// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

var server = app.listen(3000, function () {
  var host = server.address();
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});