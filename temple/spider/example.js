var 
http= require("http"),
//url=require("url"),
superagent= require("superagent"),
cheerio= require("cheerio"),
async = require("async"),
eventproxy = require("eventproxy");

/*
    ------------superagent-----
    轻量的的 http 方面的库

    ------------cheerio-----
以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，
使用方式跟 jquery 一样一样的

------------eventproxy------------
    一种事件式编程
*/

var ep= new eventproxy(),
    urlsArray = [], //存放爬取网址
    pageUrls = [],  //存放收集文章页面网站
    pageNum = 10;  //要爬取文章的页数

/*for(var i=1; i<=200; i++){
  pageUrls.push('http://www.cnblogs.com/#p'+i);
}*/

for (var i=1; i<=10; i++){
  pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+i);
}

//主 start程序
function start (){
  http.createServer(onRequest).listen(3000);
}

function onRequest(req,res){
  // 设置字符编码(去掉中文会乱码)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    
  //轮询 所有页面列表页
  pageUrls.forEach(function(pageUrl){
    superagent.get(pageUrl)
      .end(function(err,pres){
        if(err){
          //console.log(err,'superagent err')
          return ;
        }
        var $=cheerio.load(pres.text);
        var curPageUrls=$('.titlelnk');
        //console.log(curPageUrls,"---curPageUrls---");
        for(var i=0; i< curPageUrls.length; i++){
          var articleUrl=curPageUrls.eq(i).attr('href');
          urlsArray.push(articleUrl);
          console.log(urlsArray,"urlsArray")
          // 相当于一个计数器
          //ep.emit('BlogArticleHtml', articleUrl);
        }
      })
  })
}

//当 articleUrl.length==pageUrls.length*20 触发下面的程序
ep.after('BlogArticleHtml',pageUrls.length*20,function(articleUrls){
  var curCount = 0;

  var retileMove=function(url,callback){
    //延迟毫秒数
    var delay = parseInt((Math.random()*30000000) % 1000,10);
    curCount++;
    console.log('现在的并发数是',curCount,',正在抓取的是',url,',耗时'+delay+'毫秒');
  }

  // 使用async控制异步抓取
  // mapLimit(arr,limit,iterator,[callback])
  // 异步回调
  async.mapLimit(articleUrls,5,function(url,callback){
    retileMove(url,callback)
  },function(err,result){
    console.log("mapLimit start",result,'mapLimit err end');
  })
})



 exports.start= start;













/*

//----------eventproxy验证-----------
 var lens=5;   
 ep.after('got_file',lens,function(list){
  console.log('after'+list);
 });

 for  (var i=0;i<lens;i++){
  console.log('for---'+i);
  ep.emit('got_file', i);
 }

 ******/