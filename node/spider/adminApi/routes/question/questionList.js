/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2022-01-16 17:37:24
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 10:31:48
 * @FilePath: \spider\adminApi\routes\question\questionList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let express = require("express");
let router = express.Router();

const { oauth, tool, db, log } = require("../../tool/require");

/*
 *  page 页数
 *  limit 一页几条
 **/
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;

  let bookId = tool.getParams(req, "bookId");
  let bookName = tool.getParams(req, "description");
  let author = req.user && req.user.name;
  try {
  } catch (err) {}
  let questionList = [
    {
      id: "123",
      content: "",
      answer: "",
      detail: "",
      status: "",
      tags: "",
      timelimit: 20,
    },
  ];
  res.send(tool.toJson(questionList, "", 1000));
});

module.exports = router;
