//const request = require("request");
//const userAgents = require("./user-agent.js");
const tool = require("./tool");

const superagent = require("superagent");
const { cheerio, iconv } = require("./require");
require("superagent-proxy")(superagent);
require("superagent-charset")(superagent);
//const Agent = require("http").Agent;
//request(reqOptions, function(error, response, body) {});
/**
 *
 * @param {url:采集页,charset:页面编码，transform：返回数据处理} option
 */
const requestPage = function (option) {
  return new Promise(async (resolve, reject) => {
    let charset = "UTF-8";
    let rq = superagent.get(option.url);
    /*if (rq.statusCode != 200) {
      reject("页面不存在！请确认地址是否失效。");
      return;
    }else{

    }*/
    console.log("rq====", rq);
    if (option.proxy) {
      let proxyIp = await tool.redisData.ipList.getRandomIpList();
      rq.proxy(proxyIp);
    }

    if (option.hasOwnProperty("charset")) {
      charset = option.charset;
    }

    if (charset) {
      rq.set({
        "User-Agent":
          "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6)",
      })
        .charset(charset)
        .end(function (err, res) {
          console.log("requestPage", res);
          if (err) {
            reject(err);
            //console.log(err);
          } else {
            //console.log(res.status, res.headers);
            //console.log(res.text);
            let $ = null;
            if (option.transform) {
              $ = option.transform(res.text);
              let text = $(".footer_cont p").text();
              console.log(text);
            } else {
              $ = res;
            }

            resolve($);
          }
        });
    } else {
      let res = superagent
        .get(
          option.url
          //"https://www.biquge5200.cc/modules/article/search.php?searchkey=%E9%AA%B7%E9%AB%85%E7%B2%BE%E7%81%B5"
        )
        //.proxy(proxyIp)
        .end(function (err, res) {
          if (err) {
            reject(err);
            //console.log(err);
          } else {
            //console.log(res.status, res.headers);
            //console.log(res.text);
            let $ = null;
            if (option.transform) {
              $ = option.transform(res.text);
            } else {
              $ = res;
            }

            resolve($);
          }
        });
    }
  });
};

module.exports = requestPage;
