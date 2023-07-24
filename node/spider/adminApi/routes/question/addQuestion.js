/*
 *   添加问题
 *
 * */
let express = require("express");
let router = express.Router();
router.use("", async function (req, res, next) {
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
