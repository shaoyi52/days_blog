/*
 * @Author: shaoyi52 824132231@qq.com
 * @Date: 2022-06-17 11:49:22
 * @LastEditors: shaoyi52 824132231@qq.com
 * @LastEditTime: 2022-06-17 11:58:37
 * @FilePath: \spider\adminApi\reptileTool\common\reptileCommon2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { oauth, tool, db, log, reptileConfig } = require("../../tool/require2");

async function reptileCommon2(reptileType) {
  let rules = await reptileConfig.getReptileRule();
  let rule = rules[reptileType];

  let returnObj = null;

  if (rule) {
    returnObj = {
      code: rule.code,
      name: rule.name,
      baseUrl: rule.baseUrl,
      codeTransform: rule.codeTransform,
      originUrlBefore: rule.originUrlBefore,
      userAgent: rule.userAgent,
      searchUrl: (bookName) => {
        let transformName = "";
        switch (rule.codeTransform) {
          case "gbk":
            transformName = tool.encodeURIComponent_GBK(bookName);
            break;
          case "utf-8":
            transformName = tool.url_encode(bookName);
            break;
          default: //默认utf-8
            transformName = tool.url_encode(bookName);
            break;
        }
        return transformName;
      },
    };
  }

  return returnObj;
}

module.exports = reptileCommon2;
