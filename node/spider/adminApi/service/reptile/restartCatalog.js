const {
  rp,
  requestPage,
  cheerio,
  iconv,
  tool,
  log,
  db,
} = require("../../tool/require");

let getCatalog = require("../../reptileTool/getCatalog.js");

async function restartCatalog(errorId, tiType) {
  return new Promise(async (resolve, reject) => {
    if (!errorId) {
      reject("errorId不可为空");
      return;
    }
    let selectSql = `progresserror.*,catalog.num`;
    let joinSql = `JOIN catalog on catalog.id=progresserror.catalogId`;
    let errorObj = (
      await db.query(
        `select ${selectSql} from progresserror ${joinSql} where progresserror.id=${errorId}`
      )
    )[0];
    if (!errorObj) {
      reject("errorId错误");
      return;
    }
    let catalog = {
      name: errorObj.catalogName,
      reptileAddress: errorObj.reptileAddress,
      id: errorObj.catalogId,
    };
    /***只爬取一章 */
    tool.catalogQueue.push({
      params: [
        errorObj.bookId,
        errorObj.reptileType,
        errorObj.originUrl,
        errorObj.bookName,
        catalog,
        true,
        20000,
        tiType,
      ],
      pro: getCatalog,
      result: () => {
        end(errorObj, resolve, reject);
      },
      error: (err) => {
        log.error(err);
        end(errorObj, resolve, reject, err ? err : true);
      },
    });

    /**爬取结束执行函数，第四个布尔值为true,则表示爬取失败 */
    async function end(errorObj, resolve, reject, err) {
      let whereSql = `where bookName="${errorObj.bookName}" and catalogName ="${errorObj.catalogName}" and bookId=${errorObj.bookId} and catalogId=${errorObj.catalogId} and reptileAddress = "${errorObj.reptileAddress}" and originUrl= "${errorObj.originUrl}"`;
      if (err) {
        //删除progresserror表里匹配这个错误除自己外的其他列表
        whereSql += ` and id!=${errorObj.id}`;
        log.error(`delete from progresserror ${whereSql}`);
        await db.query(`delete from progresserror ${whereSql}`);
        reject(err);
        return;
      } else {
        //爬取成功 删除progresserror表里匹配到这个错误的所有列表
        log.info(`delete from progresserror ${whereSql}`);
        await db.query(`delete from progresserror ${whereSql}`);
        resolve("爬取成功");
      }
    }
  });
}
async function start() {
  try {
    let data = await restartCatalog(2, 1);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
start();
//module.exports = restartCatalog;
