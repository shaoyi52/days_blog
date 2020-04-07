var express = require('express');
var router = express.Router();
const tool = require("../../tool/require.js");

router.use('',async function(req,res,next){
	let userName = tool.getParams(req,'userName');
	let pwd = tool.getParams(req,'pwd')
	let data = "";
	let user={name:"yuyi",id:"12454",mobile:"13825562359"}
	res.send(tool.toJSON({token:'12pwdtsdse',user:user},'登录成功',1000))
})
module.exports = router
