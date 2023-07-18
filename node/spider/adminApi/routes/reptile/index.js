/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2020-08-22 13:04:14
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 13:01:11
 * @FilePath: \spider\adminApi\routes\reptile\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require("express");
var router = express.Router();
const { oauth, tool, db, log, reptileConfig } = require("../../tool/require");

/*
 *   渠道列表
 * */
router.use("", async function (req, res, next) {
  let page = tool.getParams(req, "page") || 1;
  let limit = tool.getParams(req, "limit") || 10;
  let data = null;
  try {
    //let reptileList = await reptileConfig.getReptileList();
    let allData = await db.query(`select * from reptiletool2`);
    console.log("allData");
    console.log(allData);

    let reptileList = allData;
    let count = reptileList.length;
    console.log(count);
    reptileList.forEach((value, index) => {
      console.log(index);
      reptileList[index] = value;
    });
    console.log("data");
    data = {
      reptileList,
      count,
    };
    console.log("data");
    console.log(data);
    res.send(tool.toJson(data, "", 1000));
  } catch (err) {
    res.send(tool.toJson(null, err, 1002));
  }
});

module.exports = router;
