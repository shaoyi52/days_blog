const {
  rp,
  requestPage,
  path,
  iconv,
  tool,
  log,
  db,
  fs,
} = require("../tool/require");
module.exports = getImg;
/**
 * 得到图片
 */
async function getImg(bookId, imgUrl) {
  tool.hasDir(fs, path.join(__dirname, "../../books"));
  await requestImg();
  async function requestImg() {
    let option = {
      url: imgUrl,
      charset: "",
    };
    try {
      let sres = await requestPage(option);
      let imgData = sres.body;
      let filePath = tool.isRepeat(
        fs,
        path.join(__dirname, "../../books/" + bookId + ".jpg")
      );
      fs.writeFileSync(filePath, imgData, "binary");
    } catch (err) {
      log.error(`获取${bookId}图片失败`);
      log.error(err);
    }
  }
}

getImg(
  "123",
  "http://r.m.biquge5200.cc/cover/aHR0cDovL3FpZGlhbi5xcGljLmNuL3FkYmltZy8zNDk1NzMvMjMzNjMzOC8xODA="
);
