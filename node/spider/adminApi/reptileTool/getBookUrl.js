const {
  rp,
  requestPage,
  cheerio,
  iconv,
  tool,
  log,
  db,
} = require("../tool/require");
//const reptileCommon = require("./common/reptileCommon");
const reptileCommon = require("./common/reptileCommon2");

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
