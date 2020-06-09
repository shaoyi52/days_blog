const { requestPage, tool, db, cheerio, log } = require("../tool/require");

const reptileCommon2 = require("./common/reptileCommon");
/**
 * bookId:
 * reptileType:
 * originUrl:
 * bookName:
 * catalog:
 * noIsRepeat:
 * timeout:
 * tiType:
 *
 */
async function getCatalog(
  bookId,
  reptileType,
  originUrl,
  bookName,
  catalog,
  noIsRepeat,
  timeout,
  tiType
) {
  return new Promise(async (resolve, reject) => {
    let start = 0;
    await startRp();
    async function startRp() {
      try {
        let msg = await startRpFn();
        resolve(msg);
      } catch (err) {
        //log.error(err);
        reject(err);
      }
    }

    async function startRpFn() {
      return new Promise(async (resolve2, reject2) => {
        //console.log("catalog,", catalog);
        start++;
        let reptileCommon = await reptileCommon2(reptileType);
        let uri = "";
        if (
          catalog.reptileAddress &&
          catalog.reptileAddress.indexOf("http") == 0
        ) {
          uri = catalog.reptileAddress;
        } else if (reptileCommon.originUrlBefore == 2) {
          uri = reptileCommon.baseUrl + catalog.reptileAddress;
        } else {
          originUrl =
            originUrl[originUrl.length - 1] == "/"
              ? originUrl.substr(0, originUrl.length - 1)
              : originUrl;
          uri = originUrl + catalog.reptileAddress;
        }
        // log.info(uri);
        //return;
        let option = {
          url: uri, //"https://www.biquge5200.cc/59_59763/141122881.html",
          transform: (body) => {
            return cheerio.load(body, { decodeEntities: false });
          },
        };
        try {
          let $ = await requestPage(option);
          let content = "";

          try {
            content = reptileCommon.getCatalogContent($);
            let saveSuccess = await saveContent(bookId, catalog, content);
            if (saveSuccess) {
              resolve2("成功：存取成功");
            } else {
              resolve2("错误：存取失败");
            }
          } catch (err) {
            console.log("errs");
          }
        } catch (err) {
          log.error("getCatalogRequestPageErr", uri, err);
          if (start >= 2) {
            //console.log("爬页面" + uri + "失败");
            await db.query(
              `INSERT INTO progresserror (reptileType, originUrl, bookId, catalogId, reptileAddress, bookName, catalogName) VALUES (${reptileType}, "${originUrl}", ${bookId}, ${catalog.id}, "${catalog.reptileAddress}", "${bookName}", "${catalog.name}")`
            );

            reject2("错误：连接2次都是失败");
          } else {
            try {
              //await tool.sleep(5000);
              //console.log("等待3S");
              let msg = await startRpFn();
              resolve2(msg);
            } catch (err) {
              reject2(err);
            }
          }
        }
        //console.log($("#content").html());
      });
    }
  });
}
//getCatalog(bookId, reptileType, originUrl, bookName, catalog, noIsRepeat, timeout,tiType);
//getCatalog();
async function saveContent(bookId, catalog, content) {
  try {
    let contentSection = tool.handleContent(content);
    if (contentSection.length <= 0) {
      console.log("爬取失败，失败原因，没有内容");
      return false;
    }

    let insertSql = `INSERT INTO catalogcontent${await tool.getCatalogNum(
      catalog.id
    )} (catalogId,content,bookId,num) VALUES `;
    contentSection.forEach((value, index) => {
      insertSql += `(${catalog.id},"${tool.toSql(
        value
      )}", ${bookId},${index}),`;
    });

    insertSql = insertSql.slice(0, insertSql.length - 1);
    await db.query(
      `delete from catalogcontent${await tool.getCatalogNum(
        catalog.id
      )} where catalogId=${catalog.id}`
    );
    await db.query(insertSql);
    return true;
  } catch (err) {}
}
module.exports = getCatalog;
