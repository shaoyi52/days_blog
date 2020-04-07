import express from 'express';
import db from './mongodb/db.js';
import router from './routes/index.js';

const app = express()

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
});

//router(app);


//配置服务端口
var server = app.listen(3002,function(){
  //console.log(JSON.stringify(server.address()));
    var host = server.address().address;
    var port = server.address().port;
    host = host=="::"?'localhost':host;
    console.log('listen at http://%s:%s',host,port)
})
