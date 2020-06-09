const { requestPage, tool, db, cheerio, log } = require("../../tool/require");

/***
 * 西刺
 */
async function getIpList(page) {
  return new Promise(async (resolve, reject) => {
    let option = {
      url: "https://www.xicidaili.com/wt/" + page,
      charset: "UTF-8",
      transform: function (body) {
        return cheerio.load(body, { decodeEntities: false });
      },
    };

    requestPage(option)
      .then((data) => {
        let $ = data;
        let ipList = $("#ip_list tr");
        let i = 1,
          length = ipList.length;
        let ipArr = [];
        for (i; i < length; i++) {
          let value = ipList.eq(i);
          ipArr.push({
            ip: value.find("td").eq(1).html(),
            port: value.find("td").eq(2).html(),
            address: value.find("td").eq(3).find("a").html()
              ? value.find("td").find("a").html().trim()
              : "",
            status: value.find("td").eq(4).html()
              ? value.find("td").eq(4).html().trim()
              : "",
            protocol: value.find("td").eq(5).html()
              ? value.find("td").eq(5).html().toLowerCase()
              : "",
            from: "西刺代理",
            fromHref: "http://www.xicidaili.com/wt/",
            responseTime: value.find("td").eq(6).find(".bar").attr("title")
              ? value.find("td").eq(6).find(".bar").attr("title").trim()
              : "",
          });
        }
        //console.log(JSON.stringify(ipArr));
        let allPage = $(".pagination>a").eq(-2).html();
        //console.log("allPage", allPage);
        resolve({ ipArr, allPage });
      })
      .catch((err) => {
        resolve({
          // 为了promise.all  不进入catch状态
          ipArr: [],
          error: true,
        });
      });
  });
}

/*
 * 快代理
 * */
async function getIpList2(page) {
  return new Promise(async (resolve, reject) => {
    let option = {
      url: "https://www.kuaidaili.com/free/inha/" + page,
      charset: "UTF-8",
      transform: function (body) {
        return cheerio.load(body, { decodeEntities: false });
      },
    };
    requestPage(option)
      .then((data) => {
        let $ = data;
        let ipList = $("table>tbody>tr");
        let i = 0,
          length = ipList.length;
        let ipArr = [];
        for (i; i < length; i++) {
          let value = ipList.eq(i);
          ipArr.push({
            ip: value.find("td").eq(0).html(),
            port: value.find("td").eq(1).html(),
            address: value.find("td").eq(4).html()
              ? value.find("td").eq(4).html().trim()
              : "",
            status: value.find("td").eq(2).html()
              ? value.find("td").eq(2).html().trim()
              : "",
            protocol: value.find("td").eq(3).html()
              ? value.find("td").eq(3).html().toLowerCase()
              : "",
            from: "快代理",
            fromHref: "https://www.kuaidaili.com/free/inha/",
            responseTime: value.find("td").eq(5).html()
              ? value.find("td").eq(5).html().trim()
              : "",
          });
        }
        //console.log(JSON.stringify(ipArr));
        let allPage = $("#listnav>ul>li").eq(-2).find("a").html();
        //console.log("allPage", allPage);

        resolve({
          ipArr,
          allPage,
        });
      })
      .catch((err) => {
        resolve({
          ipArr: [],
          error: true,
        });
      });
  });
}

/*
 * 新版本开心代理
 * */
async function getIpList3(page) {
  return new Promise(async (resolve, reject) => {
    let option = {
      url: "http://www.kxdaili.com/dailiip/1/" + page + ".html",
      charset: "UTF-8",
      transform: function (body) {
        return cheerio.load(body, { decodeEntities: false });
      },
    };
    requestPage(option)
      .then((data) => {
        let $ = data;
        let ipList = $(".active>tbody>tr");
        let i = 0,
          length = ipList.length;
        let ipArr = [];
        for (i; i < length; i++) {
          let value = ipList.eq(i);
          ipArr.push({
            ip: value.find("td").eq(0).html(),
            port: value.find("td").eq(1).html(),
            address: value.find("td").eq(5).html()
              ? value.find("td").eq(5).html().trim()
              : "",
            status: value.find("td").eq(2).html()
              ? value.find("td").eq(2).html().trim()
              : "",
            protocol: "http",
            from: "开心代理",
            fromHref: "http://ip.kxdaili.com",
            responseTime: value.find("td").eq(4).html()
              ? value.find("td").eq(4).html().trim()
              : "",
          });
        }

        let allPage = $("#listnav>ul>li>a").eq(-1).html();
        resolve({
          ipArr,
          allPage,
        });
      })
      .catch((err) => {
        resolve({
          ipArr: [],
          error: true,
        });
      });
  });
}

/*
 * 免费IP代理
 * */
async function getIpList4(page) {
  return new Promise(async (resolve, reject) => {
    let option = {
      url: "http://ip.jiangxianli.com/?page=" + page,
      charset: "UTF-8",
      transform: function (body) {
        return cheerio.load(body, { decodeEntities: false });
      },
    };
    requestPage(option)
      .then((data) => {
        let $ = data;
        let ipList = $(".layui-table>tbody>tr");
        let i = 0,
          length = ipList.length;
        let ipArr = [];
        for (i; i < length; i++) {
          let value = ipList.eq(i);
          ipArr.push({
            ip: value.find("td").eq(0).html(),
            port: value.find("td").eq(1).html(),
            address: value.find("td").eq(5).html()
              ? value.find("td").eq(5).html().trim()
              : "",
            status: value.find("td").eq(2).html()
              ? value.find("td").eq(2).html().trim()
              : "",
            protocol: value.find("td").eq(3).html()
              ? value.find("td").eq(3).html().toLowerCase()
              : "",
            from: "免费IP代理",
            fromHref: "http://ip.jiangxianli.com",
            responseTime: value.find("td").eq(7).html()
              ? value.find("td").eq(7).html().trim()
              : "",
          });
        }

        let allPage = $("#layui-laypage-1>a").eq(-2).html();

        resolve({
          ipArr,
          allPage,
        });
      })
      .catch((err) => {
        resolve({
          ipArr: [],
          error: true,
        });
      });
  });
}

async function getAllIpList(page) {
  return new Promise((resolve, reject) => {
    Promise.all([getIpList(page), getIpList2(page), getIpList3(page)]).then(
      (data) => {
        let allPage = 100;
        let ipArr = [];
        data.forEach((item, index) => {
          if (!item.error && allPage > item.allPage) allPage = item.allPage;
          ipArr = ipArr.concat(item.ipArr);
        });
        // console.log("getAllIpList", JSON.stringify(ipArr));

        // console.log(allPage);
        resolve({ ipArr, allPage });
      }
    );
  });
}
//let ipList = getAllIpList(1);
module.exports = getAllIpList;
