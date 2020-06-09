const {cheerio,fs,request,iconv} = require('./require');
request({
  encoding: null,//必须要设置否则乱码
  url: 'https://www.biquge5200.cc/xuanhuanxiaoshuo/'
}, function (error, response, body) {
  
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log('body:', iconv.decode(body, "GBK"));
  //$=cheerio.load(iconv.decode(body, "gbk"))
  $=cheerio.load(iconv.decode(body, "gbk"))//必须要iconv.decode否则乱码
  let bookNameList=$('.s2');
  for(var i=0; i< bookNameList.length; i++){
    var bookUrl=bookNameList.eq(i).find("a").attr('href');
    let bookName=bookNameList.eq(i).find('a').text()
   
    console.log("bookName:"+bookName)
    // 相当于一个计数器
    //ep.emit('BlogArticleHtml', articleUrl);
  }
  
  //.log($('.s2').eq(0).find('a').text())

});
function encodeURIComponent_GBK(str) {
  if(str==null || typeof(str)=='undefined' || str=='')
      return '';

  var a = str.toString().split('');

  for(var i=0; i<a.length; i++) {
      var ai = a[i];
      if( (ai>='0' && ai<='9') || (ai>='A' && ai<='Z') || (ai>='a' && ai<='z') || ai==='.' || ai==='-' || ai==='_') continue;
      var b = iconv.encode(ai, 'gbk');
      var e = ['']; // 注意先放个空字符串，最保证前面有一个%
      for(var j = 0; j<b.length; j++)
          e.push( b.toString('hex', j, j+1).toUpperCase() );
      a[i] = e.join('%');
  }
  return a.join('');
}