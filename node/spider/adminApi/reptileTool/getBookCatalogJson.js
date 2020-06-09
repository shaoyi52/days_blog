const {
  rp,
  requestPage,
  cheerio,
  iconv,
  tool,
  log,
  db,
} = require("../tool/require");
const reptileCommon2 = require("./common/reptileCommon");
const getCatalogList = require("./getCatalogList");

/*
 * 通过 url 获取
 * 获取书的目录
 * 并生成json格式
 * */
async function getBookCatalogJson_common(
  reptileType,
  url,
  callback,
  errorback
) {
  await startRp();
  async function startRp() {
    let result = null;
    let start = 0;
    let error = null;
    let reptileCommon = await reptileCommon2();
    while (!result && start <= 5) {
      start++;
      let option = {
        url: url,
        transform: (body) => {
          return cheerio.load(body, { decodeEntities: false });
        },
      };
      try {
        $ = await requestPage(option);
        result = $;
        let title = reptileCommon.bookTitle($); //reptileCommon.bookTitle($);

        let author = reptileCommon.bookAuthor($); //reptileCommon.bookAuthor($);$("#info>p").html()
        let updateTime = reptileCommon.getUpdateTime($);
        let description = reptileCommon.getDescription($);
        let imgUrl = reptileCommon.getBookImgUrl($);
        let baseUrl = tool.getHost(url);
        let bookType = 1; //"reptileCommon.getBookType($)";
        let bookStatus = 1; //1表示连载 2表示完本
        // //获取三天之前的时间
        let date = reptileCommon.beforeThreeDay();
        if (new Date(updateTime) <= date) {
          bookStatus = 2;
        }
        let book = {
          title,
          author,
          description,
          imgUrl,
          baseUrl,
          url,
          updateTime,
          bookType,
          bookStatus,
          reptileType,
        };
        //console.log(book);
        //return;
        let catalogListUrl = reptileCommon.getCatalogListUrl($);
        if (catalogListUrl) {
          //如果是有目录页
        } else {
          //书目录在介绍页主存在
          let rlt = await getCatalogList({ $, reptileCommon, callback, book });
        }

        // result = { title: title };

        //   let book = {
        //     title: title,
        //     author: author,
        //     description: description,
        //     imgUrl: imgUrl,
        //     baseUrl: baseUrl,
        //     originUrl: url,
        //     // catalog:catalogArr,
        //     updateTime: updateTime,
        //     bookType: bookType,
        //     bookStatus: bookStatus,
        //     reptileType: reptileType
        // };

        // let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${book.title}","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${book.reptileType},"${book.originUrl}","${book.imgUrl}", 2, date_sub("${new Date(book.updateTime).Format('yyyy-MM-dd')}",interval 0 day), "${book.bookType}", ${book.bookStatus},2)`;
        // await db.query(sql);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
getBookCatalogJson_common(
  1,
  "https://www.biquge5200.cc/46_46337/",
  (res) => {
    console.log("success", res);
  },
  (err) => {
    console.log(err);
  }
);

// module.exports = async (reptileType, url, callback, errorback) => {
//   reptileType = parseInt(reptileType);
//   return getBookCatalogJson_common(reptileType, url, callback, errorback);
// };
