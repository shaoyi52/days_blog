function encodeURIComponent_GBK(str) {
  if (str == null || typeof str == "undefined" || str == "") return "";

  var a = str.toString().split("");

  for (var i = 0; i < a.length; i++) {
    var ai = a[i];
    if (
      (ai >= "0" && ai <= "9") ||
      (ai >= "A" && ai <= "Z") ||
      (ai >= "a" && ai <= "z") ||
      ai === "." ||
      ai === "-" ||
      ai === "_"
    )
      continue;
    var b = iconv.encode(ai, "gbk");
    var e = [""]; // 注意先放个空字符串，最保证前面有一个%
    for (var j = 0; j < b.length; j++)
      e.push(b.toString("hex", j, j + 1).toUpperCase());
    a[i] = e.join("%");
  }
  return a.join("");
}

//查看是否有此文件夹，没有则建立一个文件夹
function hasDir(fs, path) {
  let exists = fs.existsSync(path);
  if (exists) {
    fs.mkdirSync(path);
  }
}

/*
*统一获取接口参数，
*同时也为了防止sql注入
* 
*/

function getParams(req, name, notrans) {
  let body = req.query[name] || req.body[name] || "";
  if (!notrans) {
    return body.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
  return body;
}
const toJSON = function(data, msg, code) {
  return JSON.stringify({
    code: code || 1000,
    data: data,
    msg: msg || ""
  });

  /*
    * code
    * 1000   请求接口成功
    * 1002   代码错误，前端直接显示报错信息
    * 1003   token验证失败，前端直接跳转到登录页
    * 1004   权限不够，前端直接跳转到首页
    * */
};

module.exports = {
  getParams,
  toJSON
};
