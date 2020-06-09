//const { requestPage, tool, db, cheerio, log } = require("../../tool/require");
const request = require("superagent");
require("superagent-proxy")(request);
/***
 * 西刺
 */
async function checkIp(ipObj) {
  return new Promise(async (resolve, reject) => {
    request
      .get("http://www.baidu.com")
      .proxy(`${ipObj.protocol}://${ipObj.ip}:${ipObj.port}`)
      .timeout({
        response: 5000, // Wait 5 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      })
      .then(
        (res) => {
          resolve([ipObj, true]);
          /* responded in time */
        },
        (err) => {
          if (err.timeout) {
            resolve([ipObj, false, err.timeout]); /* timed out! */
          } else {
            resolve([ipObj, false, err]); /* other error */
          }
        }
      );
  });
}
// try {
//   checkIp({
//     ip: "61.135.185.172",
//     protocol: "http",
//     port: "80",
//   });
// } catch (err) {
//   console.log("tts");
// }
module.exports = checkIp;
