let fs = require("fs");
let rp = require("request-promise");
let request = require("request");
let cheerio = require("cheerio"); //Cheerio can parse nearly any HTML or XML document
let path = require("path");
let db = require("./mysql.js");
let tool = require("./tool.js");
let log = require("tracer").colorConsole(); //A powerful and customizable logging library for node.js.
let iconv = require("iconv-lite"); //Pure JS character encoding conversion
let morgan = require("morgan"); //HTTP request logger middleware for node.js
let async = require("async"); //A pure ESM version of Async is available as async-es.
let xlsx = require("node-xlsx");
let requestPage = require("./requestPage");

module.exports = {
  fs,
  rp,
  request,
  requestPage,
  cheerio,
  iconv,
  morgan,
  path,
  db,
  tool,
  //oauth,
  log,
  async,
  xlsx
};
