var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../tool/require");
const getBookUrl = require("../../reptileTool/getBookUrl");

/*
 *   获取书的url地址
 * */
router.use("", async function(req, res, next) {
  let bookName = tool.getParams(req, "bookName");
  let reptileType = tool.getParams(req, "reptileType" || 0);
  let isProxy = tool.getParams(req, "isProxy" || "true");

  if (isProxy == "true") {
    isProxy = true;
  } else {
    isProxy = false;
  }
  try {
    let reptileTypeArr = reptileType.split(",");
    let bookUrls = [];
    reptileTypeArr.forEach((value, index) => {
      bookUrls.push(getBookUrl(value, bookName, isProxy));
    });
    Promise.all(bookUrls)
      .then(async result => {
        let sendArr = [];
        let errorArr = [];
        result.forEach(async (urlList, index) => {
          console.log("urlList", urlList);
          if (typeof urlList === "object" && urlList.length > 0) {
            urlList.forEach(async (list, index2) => {
              list.reptileType = reptileTypeArr[index];
            });
            sendArr = sendArr.concat(urlList);
          } else {
            errorArr.push(urlList);
          }
        });
        res.send(tool.toJson({ urlList: sendArr, errorArr }, "", 1000));
      })
      .catch(function(error) {
        res.send(tool.toJson(null, "获取链接失败，失败原因：" + error, 1002));
      });
  } catch (err) {
    res.send(tool.toJson(null, err, 1002));
  }
});

module.exports = router;
