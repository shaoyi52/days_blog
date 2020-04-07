var express = require('express');

//var port = process.env.PORT || config.dev.port
var app = express()

/*var _resolve
var readyPromise = new Promise(resolve =>{
  _resolve = resolve
})
*/
app.all('*',function(req,res,next){//设置跨域访问
  res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
})
var infor = [//测试的数据
    {
        name:'jay',
        age:20,
        sex:'男',
        hobby:'basketball'
    },
    {
        name:'贼好玩',
        age:23,
        sex:'女',
        hobby:'shopping'
    }]

app.get('/api',function(req,res){           //配置接口api
    res.status(200),
    res.json(infor)
})

//var server = app.listen(port)
//配置服务端口
var server = app.listen(3002,function(){
  //console.log(JSON.stringify(server.address()));
    var host = server.address().address;
    var port = server.address().port;
    host = host=="::"?'localhost':host;
    console.log('listen at http://%s:%s',host,port)
})

/*module.exports = {
  ready:readyPromise,
  close:()=>{
    server.close()
  }
}*/
