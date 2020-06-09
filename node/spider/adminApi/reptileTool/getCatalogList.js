const {
  rp,
  requestPage,
  cheerio,
  iconv,
  tool,
  log,
  db,
} = require("../tool/require");
require("../../common/prototype");
async function getCatalogList({
  $,
  reptileCommon,
  callback,
  book: {
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
  },
  updateNewCatalog,
}) {
  // let option = {
  //   url: "https://www.biquge5200.cc/59_59763/",
  //   transform: (body) => {
  //     return cheerio.load(body, { decodeEntities: false });
  //   },
  // };
  //let $ = //await requestPage(option);
  //console.log($("#list a"));
  let catalogStr = []; //目录列表
  if (reptileCommon.getIsPage()) {
    let list = $("#list a");
    let i = 0,
      len = list.length;
    for (i = 0; i < len; i++) {
      let obj = list.eq(i);
      let href = obj.attr("href");
      console.log(obj.html() + "__" + href);
    }
  } else {
    catalogStr = reptileCommon.getCatalogList($);
  }

  if (updateNewCatalog) {
    // 更新章节
  } else {
    // 新增一本书的json
    let catalogArr = [];
    let i = reptileCommon.getCatalogFirstNum($),
      length = catalogStr.length;

    //let catalogFirstNum=reptileCommon.getCatalogFirstNum($);
    for (i; i < length; i++) {
      catalogArr.push(reptileCommon.getCatalog($, catalogStr, i));
    }
    let book = {
      title: title,
      author: author,
      description: description,
      imgUrl: imgUrl,
      baseUrl: baseUrl,
      originUrl: url,
      // catalog:catalogArr,
      updateTime: updateTime,
      bookType: bookType,
      bookStatus: bookStatus,
      reptileType: reptileType,
    };
    let sql = `INSERT INTO book(name, author, description, reptileType, originUrl, imgUrl, type,updateTime,bookType,bookStatus,isJin) VALUES ("${
      book.title
    }","${tool.toSql(book.author)}","${tool.toSql(book.description)}", ${
      book.reptileType
    },"${book.originUrl}","${book.imgUrl}", 2, date_sub("${new Date(
      book.updateTime
    ).Format("yyyy-MM-dd")}",interval 0 day), "${book.bookType}", ${
      book.bookStatus
    },2)`;
    await db.query(sql);
    let bookIdSql = `select id from book where name="${tool.toSql(
      book.title
    )}" And author = "${book.author}"`;
    let bookId = tool.getData(await db.query(bookIdSql));
    let catalogSql = `INSERT INTO catalog (bookId, name, num, type, reptileAddress, createTime) VALUES`;
    let catalogLength = catalogArr.length;
    catalogArr.forEach((value, index) => {
      catalogSql += `(${bookId},"${tool.toSql(value.title)}",${index * 2},${
        value.type
      },"${value.href}", now())`;
      if (index == catalogLength - 1) {
        // catalogSql += "(${value})";
      } else {
        catalogSql += `,`;
      }
    });
    await db.query(catalogSql);
    console.log("getCatalogList sucess");
    if (callback) callback();
    return true;
  }

  //console.log(list);
  //   let len = list.length;
  //   console.log(len);
  //   console.log(list[0].html());
  //   console.log(list[1].html());
}
module.exports = getCatalogList;
// module.exports = async (reptileCommon, callback, book, updateNewCatalog) => {
//   return getCatalogList($, reptileCommon, callback, book, updateNewCatalog);
// };
