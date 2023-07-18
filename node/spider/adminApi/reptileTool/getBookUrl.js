/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2020-02-16 18:14:33
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 11:34:34
 * @FilePath: \spider\adminApi\reptileTool\getBookUrl.js
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
} = require("../tool/require");
const reptileCommon = require("./common/reptileCommon");
//const reptileCommon = require("./common/reptileCommon2");

/*
 * 通过 url 获取
 * 获取书的url地址
 * */
async function getBookUrl_common(reptileType, bookName, isProxy) {
  return new Promise(async (resolve, reject) => {
    let repTileObj = await reptileCommon(reptileType);
    let searchUrl = repTileObj.searchUrl(bookName);
    console.log("searchUrl", searchUrl);
    try {
      let option = {
        url: searchUrl,
        transform: (body) => {
          return cheerio.load(body, { decodeEntities: false });
        },
        charset: "gbk",
      };
      let $ = await requestPage(option);
      //let repTileObj = await reptileCommon();
      let html = $.html();
      let list = repTileObj.getBookList($);
      resolve(list);
    } catch (err) {
      resolve(err);
    }
  });
}

module.exports = async (reptileType, bookName, isProxy) => {
  reptileType = parseInt(reptileType);
  return getBookUrl_common(reptileType, bookName, isProxy);
};
