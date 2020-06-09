const { requestPage, tool, db, cheerio, log } = require("../../tool/require");
const getIpList = require("./getIpList");
const checkIp = require("./checkIp");
/**
 * 批量爬取可用IP
 *
 * startPage
 * endPage
 * checkCount
 */
async function startReptile(startPage, endPage, callback) {
  endPage = parseInt(endPage) || 3;
  let allPage = endPage || 3;
  let current = parseInt(startPage) || 1;
  let ipList = [];
  for (current; current < allPage; current++) {
    try {
      log.info(`开始第${current}页`);
      let data = await getIpList(current);
      if (data) {
        ipList = ipList.concat(data.ipArr);
        allPage =
          parseInt(data.allPage) >= endPage ? endPage : parseInt(data.allPage);
      }
    } catch (err) {
      log.error(`第${current}页错误,错误信息:${err}`);
    }
    await tool.sleep(3000);
  }

  let i = 0,
    length = ipList.length;
  let list = [];
  let overLength = 0;
  let yu = length > 10 ? Math.ceil(length / 20) : length > 1 ? 1 : 0;
  let needCount = length - yu;
  for (i; i < length; i++) {
    tool.ipQueue.push(
      {
        params: [ipList[i]],
        pro: checkIp,
        result: (data, isTrue, err) => {
          overLength++;
          if (overLength > needCount) {
            return;
          }
          if (isTrue) {
            log.info(
              `${data.protocol}://${data.ip}:${data.port}可以访问，当前第${overLength}条，共${length}条IP需要检查`
            );
            list.push(data);
          } else {
            try {
              log.error(
                `${data.protocol}://${data.ip}:${data.port}不可以访问，当前第${overLength}条，共${length}条IP需要检查，不可访问原因：${err}`
              );
            } catch (err2) {
              log.error(
                `当前第${overLength}条，共${length}条IP需要检查，不可访问原因：1、${err2}，2、${err}`
              );
            }
          }
          finish();
        },
        error: () => {
          log.error("由于未知原因，来到了这里，警惕");
          overLength++;
          if (overLength > needCount) {
            return;
          }
          finish();
        },
      },
      (err) => {}
    );
  }

  async function finish() {
    if (overLength == needCount) {
      end();
    }
  }

  async function end() {
    log.info(
      `共检查了${length}条数据，其中有${list.length}条IP是有用的，开始保存`
    );
    await tool.redisData.ipList.updateIpList(list);
    log.info(`保存${list.length}条IP完毕`);
    callback && callback();
  }
}

async function getIps() {
  let iplist = await tool.redisData.ipList.getAllIpList();
  console.log("iplist", iplist);
}
async function getipObj() {
  let ipObj = await tool.redisData.ipList.getRandomIpList();
  console.log("ipObj", ipObj);
}

//getipObj();

startReptile(1, 3, () => {});

//module.exports = startReptile;
