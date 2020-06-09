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
//const reptileCommon2 = require("./common/reptileCommon2");

/*
 * 通过 url 获取
 * 获取书的url地址
 * */
async function getBookUrl_common(reptileType, bookName, isProxy) {
  return new Promise(async (resolve, reject) => {
    try {
      let option = {
        url:
          "https://www.biquge5200.cc/modules/article/search.php?searchkey=%E9%AA%B7%E9%AB%85%E7%B2%BE%E7%81%B5",
        transform: (body) => {
          return cheerio.load(body, { decodeEntities: false });
        },
      };
      let $ = await requestPage(option);
      let repTileObj = await reptileCommon();
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
