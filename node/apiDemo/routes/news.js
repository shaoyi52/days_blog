'use strict';

import express from 'express'
import News from '../models/news/news'
const router = express.Router()

//返回统一格式
var responseData;
router.use(function(req,res,next){
  responseData={
    code:"0000",
    message:'ok'
  }
  next();
})

/**
 * post 新增新闻内容
 */
router.post('/', function(req,res){
  let title=req.body.title;
  let content=req.body.content;
  if(title==""||title==undefined){
    responseData['code']="1000";
    responseData['message']='缺少参数title';
  }else if(content==""||content==undefined){
    responseData['code']="1000";
    responseData['message']='缺少参数content'
  }else{
     //保存新闻信息
    let news = new News({
        title: title,
        content: content
    });
    news.save()
    responseData['message']='add success'
  }
  
  res.send(responseData);
});


/**
 * get 请求新闻内容
 */
router.get('/', function(req,res,next){
  //console.log(req.query,"asds");
  let id=req.query.id
  if(id==""||id==undefined){
    News.find().limit(2).then(function(newsInfo){
      console.log(newsInfo);
       responseData['result']=newsInfo;
        res.send(responseData);
    }).catch(function (err) {
      responseData.message=err
      res.json(responseData);
    })   
  }else{
    News.find({"_id":id}).then(function(newsInfo){
      console.log(newsInfo);
       responseData['result']=newsInfo;
        res.send(responseData);
    }).catch(function (err) {
      responseData.message=err
      res.json(responseData);
    })   
  }
});



/**
 * put 新闻更新
 */
router.put('/',function(req,res){
  let id=req.body.id;
  let content=req.body.content;
  let title=req.body.title;
  if(id==""||id==undefined){     
    responseData['code']="1000";
    responseData['message']='缺少参数id'
    res.send(responseData);
  }else{
     News.update({"_id":id}, { $set : { "title" : title,"content" : content} }).then(function(newsInfo){
      console.log(newsInfo);
       responseData['result']=newsInfo;
        res.send(responseData);
    }).catch(function (err) {
      responseData.message=err
      res.json(responseData);
    })   
  }
})


/**
 * delete 新闻删除
 */
router.delete('/',function(req,res){
  let id=req.body.id;
  console.log(req);
  if(id==""||id==undefined){     
    responseData['code']="1000";
    responseData['message']='缺少参数id'
    res.send(responseData);
  }else{
    News.remove({"_id":id}).then(function(Info){
      console.log(Info);
      responseData['message']='成功删除数据id：'+id;
      responseData['result']=Info;
        res.send(responseData);
    }).catch(function (err) {
      responseData.message=err
      res.json(responseData);
    })   
     
  }
})

export default router