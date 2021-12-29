let express=require("express");
let router = express.Router();

const {oauth,tool,db,log} = require("../../tool/require");

/*
 *  page 页数
 *  limit 一页几条
 **/
router.use("",async function(req,res,next){
	let page = tool.getParams(req,"page") || 1;
	let limit = tool.getParams(req,"limit")|| 10;

	let bookId = tool.getParams(req,"bookId");
	let bookName = tool.getParams(req,"description");
	let author = req.user && req.user.name;
	try
	{
		
	}
	catch (err)
	{
	}
	let questionList=[{id:"123",content:"",answer:"",detail:"",status:"",tags:""，timelimit:20}]
	res.send(tool.toJson(questionList,"",1000)
})

module.exports = router;