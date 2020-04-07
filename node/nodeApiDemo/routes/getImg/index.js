var express = require('express');
var router = express.Router();
const tool = require("../../tool/require.js");
var superagent = require('superagent');
var fs = require("fs");

router.use('',function(req,res,next){
	let url="http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg"
	let request = superagent.get(url)
	.end(function(err, sres) {
                if (err) {
                    console.log(err);
                    return;
                }
                fs.writeFile("./image/a.jpg", sres.body, "binary", function(err) {
                    if (err) throw err;
                });
            });
  
})
module.exports = router
