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
    deleteRepeat={}, //去重哈希数组
    catchDate=[], //存放博主信息
    pageNum = 100;  //要爬取文章的页数
    startDate = new Date(),	//开始时间
    endDate = false;	//结束时间

/*for(var i=1; i<=200; i++){
  pageUrls.push('http://www.cnblogs.com/#p'+i);
}*/

for (var i=1; i<=10; i++){
  pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+i);
}
console.log('pageUrls')
// 抓取昵称、入园年龄、粉丝数、关注数
function personInfo(url){
  var infoArray = {};
  superagent.get(url)
    .end(function(err,ares){
      if(err){
        console.log(err);
        return;
      }

      var $ = cheerio.load(ares.text);
      var info = $('#profile_block a'),
          len = info.length,
          age = "",
          flag = false,
          curDate = new Date();

      // 小概率异常抛错
      try{
          age = "20"+(info.eq(1).attr('title').split('20')[1])
      } catch(err){
        console.log(err);
        age = "2012-11-06";
      } 

      infoArray.name = info.eq(0).text();
      infoArray.age = parseInt((new Date(age))/1000/60/60/24);

      if(len == 4){
         infoArray.fans= info.eq(2).text();
         infoArray.focus = info.eq(3).text();
      } else if( len == 5){//博客园推荐博客
        infoArray.fans= info.eq(3).text();
        infoArray.focus = info.eq(4).text();
      }  
        catchDate.push(infoArray);
    })
}

//判断作者是否重复
function isRepeat(authorName){
  if(deleteRepeat[authorName] == undefined){
    deleteRepeat[authorName] = 1;
    return 0
  }else if(deleteRepeat[authorName] == 1){
    return 0
  }

}


//主 start程序
function start (){
  http.createServer(onRequest).listen(3000);
}

function onRequest(req,res){
  // 设置字符编码(去掉中文会乱码)
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  

  ep.after('BlogArticleHtml',pageUrls.length*20,function(articleUrls){

/*    res.write(articleUrls.join("<br/>"));
    res.write("<br/>");
    res.write("length:"+articleUrls.length)
    res.write("<br/>");*/

    var curCount = 0;

    var retileMove=function(url,callback){
      //延迟毫秒数
      var delay = parseInt((Math.random()*30000000) % 1000,10);
      curCount++;
      
      res.write('现在的并发数是'+curCount+',正在抓取的是'+url+',耗时'+delay+'毫秒');
      console.log('现在的并发数是',curCount,',正在抓取的是',url,',耗时'+delay+'毫秒');
      res.write("<br/>");
      superagent.get(url)
          .end(function(err,sres){
            // 常规的错误处理
            if (err) {
              console.log(err);
              return;
            }       

            
            var $ = cheerio.load(sres.text);

            var currentBlogApp = url.split('/p/')[0].split('/')[3];
            var requestId=url.split('/p/')[1].split('.')[0];
   /*         res.write('currentBlogApp is '+ currentBlogApp + ' , ' + 'requestId id is ' + requestId +'<br/>'); 
            console.log('currentBlogApp is '+ currentBlogApp + '\n' + 'requestId id is ' + requestId); 
            res.write('the article title is :'+$('title').text() +'<br/>');
            */
            var flag =  isRepeat(currentBlogApp);
            if(!flag){
              var appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp="+ currentBlogApp;
              personInfo(appUrl);
            }
          })

      setTimeout(function() {
        curCount--;
        callback(null,url +'Call back content');
      }, delay);  

    }

    // 使用async控制异步抓取
    // mapLimit(arr,limit,iterator,[callback])
    // 异步回调
    async.mapLimit(articleUrls,5,function(url,callback){
       res.write("<br/>");
       res.write("mapLimit"+url);
      retileMove(url,callback)
    },function(err,result){
		endDate = new Date();
		console.log(catchDate);
		console.log('final:');
		var len=catchDate.length,
			aveAge=0,
			aveFans=0,
			aveFocus=0;

		for(var i=0;i<len;i++){
			var eachDataObj=catchDate[i];
			var eachDataStr=JSON.stringify(catchDate[i]);
			eachDataObjFans=eachDataObj.fans||11;
			eachDataObjFocus=eachDataObj.focus|11;
			aveAge += parseInt(eachDataObj.age);
			aveFans += parseInt(eachDataObjFans);
			aveFocus+= parseInt(eachDataObjFocus);

			res.write(eachDataStr+'<br/>');
		}

		//统计结果
			res.write('<br/>');
			res.write('<br/>');
			res.write('/**<br/>');
			res.write(' * 爬虫统计结果<br/>');
			res.write('**/<br/>');
			res.write('1、爬虫开始时间：'+ startDate +'<br/>');
			res.write('2、爬虫结束时间：'+ endDate +'<br/>');
			res.write('3、耗时：'+ (endDate - startDate) +'ms' +' --> '+ (Math.round((endDate - startDate)/1000/60*100)/100) +'min <br/>');
			res.write('4、爬虫遍历的文章数目：'+ pageNum*20 +'<br/>');
			res.write('5、作者人数：'+ len +'<br/>');
			res.write('6、作者入园平均天数：'+ Math.round(aveAge/len*100)/100 +'<br/>');
			res.write('7、作者人均粉丝数：'+ Math.round(aveFans/len*100)/100 +'<br/>');
			res.write('8、作者人均关注数：'+ Math.round(aveFocus/len*100)/100 +'<br/>');

        //console.log(result);
       
      //console.log("mapLimit start",catchDate,'mapLimit err end');
    })

  /* mapLimit实验

   var parts = [ 1,2,3,4,5,6,7,8,9,10 ];
    async.mapLimit(parts, 2, function(part, callback) {
      //console.log('part',part);
      setTimeout(function() {
        console.log('finished',part);
        callback(null);
      }, 1000);
     
    }, function(err, result) {
         console.log('in finalizer');
         console.log(err,result);
    });*/

  })

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
         // res.write(articleUrl);
          //res.write('<br/>');
          urlsArray.push(articleUrl);

          //console.log(urlsArray,"urlsArray")
          // 相当于一个计数器
          ep.emit('BlogArticleHtml', articleUrl);
        }
        
        //res.write("采我集网址length:"+urlsArray.length);
        //res.write(JSON.stringify(urlsArray));
      })
  })
}

//当 articleUrl.length==pageUrls.length*20 触发下面的程序




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