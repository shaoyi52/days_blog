/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2022-06-16 12:42:31
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-16 14:17:03
 * @FilePath: \spider\common\reptileConfig\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { oauth, tool, db, log } = require("../tool/require");

async function getReptileList() {
  let count = await tool.redisData.reptileList.getReptileCount();
  if (!count) {
    let allData = await db.query(`select from reptiletool2`);
    tool.redisData.reptileList.updateReptileList(allData);
  }
  count = await tool.redisData.reptileList.getReptileCount();
  return await tool.redisData.reptileList.getReptileList(0, count - 1);
}
/*
 * 更新redis里的reptile配置数据
 */
async function refreshReptileList() {
  let allData = await db.query(`select from reptiletool2`);
  await tool.redisData.reptileList.updateReptileList(allData);
  let count = await tool.redisData.reptileList.getReptileCount();
  return await tool.redisData.reptileList.getReptileList(0, count - 1);
}

/**
 * 获取规则
 */
async function getReptileRule() {
  let reptileList = await getReptileList();
  let rules = {};
  reptileList.forEach((value, index) => {
    let value2 = JSON.parse(value);
    rules[value2.reptileTypeId] = value2;
  });
  return rules;
}

module.exports = {
  getReptileList,
  refreshReptileList,
  getReptileRule,
  a,
};
