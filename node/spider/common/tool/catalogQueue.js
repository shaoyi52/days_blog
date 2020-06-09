let async = require("async");

let catalogQueue = async.queue((obj, cb) => {
  obj.pro
    .apply(this, obj.params)
    .then(async (data) => {
      if (typeof data == "string" && data.indexOf("错误：") == 0) {
        obj.error && (await obj.error(data));
        await cb();
      } else {
        obj.result && (await obj.result(data));
        await cb();
      }
    })
    .catch(async (err) => {
      //console.log("catalogQueue报错");
      //console.log(err);
      obj.error && (await obj.error("catalogQueue错误：" + err));
      await cb(err);
    });
}, 150);

module.exports = catalogQueue;
