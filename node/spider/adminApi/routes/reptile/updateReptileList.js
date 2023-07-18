/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2022-06-17 10:52:38
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-17 11:34:11
 * @FilePath: \spider\adminApi\routes\reptile\updateReptileList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express");
const router = express.Router();
const { log, db, oauth, tool, reptileConfig } = require("../../tool/require");

/**
 * page 页数
 * limit 一页几条
 *
 **/
router.use("", async function (req, res, next) {
  try {
    let reptileList = await reptileConfig.refreshReptileList();
    let count = reptileList.length;

    reptileList.forEach((value, index) => {
      reptileList[index] = JSON.parse(value);
    });

    let data = {
      reptileList,
      count,
    };
    res.send(tool.toJson(data, "", 10000));
  } catch (err) {
    res.send(tool.toJson(null, JSON.stringify(err), 1002));
  }
});

module.exports = router;
