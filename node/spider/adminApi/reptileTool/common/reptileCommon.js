/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2020-02-21 18:45:16
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 11:05:20
 * @FilePath: \spider\adminApi\reptileTool\common\reptileCommon.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
  rp,
  requestPage,
  cheerio,
  iconv,
  tool,
  log,
  db,
} = require("../../tool/require");
function handleEq(dom, ruleSplit0, $) {
  let findDom = null;
  if (ruleSplit0.indexOf(":eq(") == -1) {
    //没有eq的写法
    if (dom) {
      findDom = dom.find(ruleSplit0);
    } else {
      findDom = $(ruleSplit0);
    }
  } else {
    //兼容选择器:eq写法
    let rules = ruleSplit0.split(/:eq\(\d\)/); //这里的数组数量永远比下面多1
    let eqs = ruleSplit0.match(/:eq\(\d\)/g); //这里的数组数量永远比上面少1
    if (dom) {
      findDom = dom.find(rules[0]);
    } else {
      findDom = $(rules[0]);
    }
    findDom = findDom.eq(eqs[0].replace(":eq(", "").replace(")", ""));
    let i = 1,
      length = rules.length - 1;
    for (i; i < length; i++) {
      findDom = findDom.find(rules[i]);
      findDom = findDom.eq(eqs[i].replace(":eq(", "").replace(")", ""));
    }
    findDom = rules[i] ? findDom.find(rules[i]) : findDom;
  }

  return findDom;
}

function domCommon(dom, rule, $) {
  let ruleSplit = rule.split("、");
  let findDom = null;
  let type = ruleSplit[1];
  if (ruleSplit[0]) {
    findDom = handleEq(dom, ruleSplit[0], $);
  } else {
    findDom = dom;
  }
  let result = null;

  if (type == "html") {
    result = findDom.html() && findDom.html().trim();
  } else if (type == "spanHtml") {
    result =
      findDom.html() &&
      findDom
        .html()
        .replace(/(<\/?span.*?>)/g, "")
        .trim(); // 过滤标签，保留内容
  } else if (type == "aHtml") {
    result =
      findDom.html() &&
      findDom
        .html()
        .replace(/(<\/?a.*?>)/g, "")
        .trim(); // 过滤标签，保留内容
  } else if (type == "allHtml") {
    result =
      findDom.html() &&
      findDom
        .html()
        .replace(/(<\/?font.*?>)|(<\/?span.*?>)|(<\/?a.*?>)/g, "")
        .trim();
  } else if (type == "text") {
    result = findDom.text() && findDom.text().trim();
  } else if (type == "val") {
    result = findDom.val() && findDom.val().trim();
  } else if (type && type.indexOf("attr") == 0) {
    result =
      findDom.attr(type.split("attr")[1]) &&
      findDom.attr(type.split("attr")[1]).trim();
  } else if (type && type.indexOf("index") === 0) {
    let indexCompute = parseInt(type.replace("index", "")) || 0;
    if (indexCompute) {
      return findDom.index() + indexCompute;
    } else {
      return findDom.index();
    }
  }
  return handleRule(ruleSplit, 2, result);
}
/**
 * 处理规则
 * ruleSplit 规则数组
 * startIndex 数组从哪里开始
 * result 要处理的数据
 * "#info>p:nth-child(2)、html、split、：、1"
 *  目前split规则    split规则是三个三个来的  第一个值是split，固定的，第二个值是分割的值，第三个值是索引值（索引值有个特殊的值length-1 也就是最后一个 length-2也就是倒数第二个，以此类推）
 */
function handleRule(ruleSplit, startIndex, result) {
  switch (ruleSplit[startIndex]) {
    case "split":
      let resultArr = result.split(ruleSplit[startIndex + 1]);
      let index = 0;
      if (
        ruleSplit[startIndex + 2] &&
        ruleSplit[startIndex + 2].indexOf("length-") == 0
      ) {
        let endIndex = parseInt(ruleSplit[startIndex + 2].split("length-")[1]);
        index = resultArr.length - endIndex;
      } else {
        index = ruleSplit[startIndex + 2] || 0;
      }
      result = resultArr[index] || result;
      startIndex += 3;
      break;
    default:
      break;
  }
  if (startIndex + 3 <= ruleSplit.length) {
    return handleRule(ruleSplit, startIndex, result);
  } else {
    return result && result.trim();
  }
}

async function reptileCommon() {
  let rule = {
    searchUrl:
      "https://www.biquge5200.cc/modules/article/search.php?searchkey=%E9%AA%B7%E9%AB%85%E7%B2%BE%E7%81%B5",
    searchList: ".grid>tbody>tr",
    searchListStart: 1,
    searchListTitle: "td>a、html",
    baseUrl: "",
    searchListUrl: "td>a、attrhref",
    searchListAuthor: "td:nth-child(3)、html",
    searchListStatus: "td:nth-child(6)、html",
    bookTitle: "#info>h1、html",
    bookAuthor: "#info>p:eq(0)、html、split、：、1",
    updateTime: "#info>p:last-child、html、split、：、1",
    description: "#info+div>p、html",
    bookImgUrl: "#fmimg>img、attrsrc",
    isPage: false, //获取目录是否分页,
    catalogList: "#list a", //目录列表
    firstCatalogList: "#list>dl>dt:eq(1)、index-1",
    catalogContent: "#content、html",
  };
  reptileObj = {
    getBookList: ($) => {
      let list = []; //[{title:'',url:'',auto:'',status:''}]
      let domList = $(rule.searchList);
      //console.log("domList", domList.html());
      let i = rule.searchListStart,
        length = domList.length;
      for (i; i < length; i++) {
        let url =
          rule.baseUrl + domCommon(domList.eq(i), rule.searchListUrl, $);
        list.push({
          title: domCommon(domList.eq(i), rule.searchListTitle, $),
          url: url,
          auto: domCommon(domList.eq(i), rule.searchListAuthor, $),
          status: domCommon(domList.eq(i), rule.searchListStatus, $),
        });
      }
      return list;
    },
    bookTitle: ($) => {
      return domCommon(null, rule.bookTitle, $);
    },
    bookAuthor: ($) => {
      return domCommon(null, rule.bookAuthor, $);
    },
    getUpdateTime: ($) => {
      return domCommon(null, rule.updateTime, $);
    },
    getDescription: ($) => {
      return domCommon(null, rule.description, $);
    },
    getBookImgUrl: ($) => {
      return domCommon(null, rule.bookImgUrl, $);
    },
    beforeThreeDay: () => {
      var date = new Date(); //获取当前时间
      date.setDate(date.getDate() - 3); //设置天数 -3 天
      return date;
    },
    // 获取目录是否是分页
    getIsPage: () => {
      if (rule.isPage) {
        return true;
      } else {
        return false;
      }
    },
    getCatalogListUrl: ($) => {
      if (rule.catalogListUrl) {
        let catalogListUrl = domCommon(null, rule.catalogListUrl, $);
        if (catalogListUrl.indexOf("http") !== 0) {
          catalogListUrl = rule.baseUrl + catalogListUrl;
        }
        return catalogListUrl;
      } else {
        return null;
      }
    },
    getCatalogList: ($) => {
      return $(rule.catalogList);
    },
    getCatalogFirstNum($) {
      //暂时为0，以后再找规则
      if (!rule.firstCatalogList) {
        return 0;
      } else {
        return domCommon(null, rule.firstCatalogList, $);
      }
    },
    getCatalog: ($, catalogStr, i) => {
      //规则暂时有问题，目前先这样
      let catalog = $(catalogStr[i]);
      // let title = catalog.html();
      let title = catalog.html();
      let type = 1; //1带章节
      if (title.indexOf("章") == -1 && title.indexOf("第") == -1) {
        type = 2; //2没有章节
      }
      let href =
        "/" +
        catalog.attr("href").split("/")[
          catalog.attr("href").split("/").length - 1
        ];
      // console.log(title,href);
      return {
        title: title,
        // href:"/" + domCommon(catalog, "、" + "attrhref、split、/、length-1"),
        href: href,
        // href: "/" + catalog.attr("href").split("/")[catalog.attr("href").split("/").length - 1],
        type: type,
      };
    },
    getCatalogContent: ($) => {
      let content = domCommon(null, rule.catalogContent, $) || "";
      content = content
        .replace(/\n/g, "")
        .replace(/<p>/g, "<br>")
        .replace(/<\/p>/g, "<br>");

      content = tool.filterHtmlOrContainer(content || ""); // 除br之外，其他标签全部过滤
      let contentArr = content.split("<br>");
      let i = 0,
        length = contentArr.length;
      for (i; i < length; i++) {
        if (!contentArr[i] || contentArr[i].trim() == "") {
          contentArr.splice(i, 1);
          i--;
          length--;
        } else {
          contentArr[i] = contentArr[i] && contentArr[i].trim();
        }
      }

      return contentArr.join("<br>");
    },
    searchUrl: (bookName) => {
      /*返回搜索地址*/
      return (
        "http://www.ibiqu.net/modules/article/search.php?searchkey=" +
        tool.encodeURIComponent_GBK(bookName)
      );
    },
  };

  return reptileObj;
}

module.exports = reptileCommon;
