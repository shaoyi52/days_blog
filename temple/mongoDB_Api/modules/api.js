var express = require('express');
var router = express.Router();
var User = require('../models/user');
var News = require('../models/news');

//返回统一格式
var responseData;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  }
  next();
})

router.get('/', function (req, res) {
  console.log("get"); 
  responseData['message']='hello world'  
  res.send(responseData);
});
/*router.get('/test',function(req,res,next){
  res.json(responseData);
})*/

/*
 * 注册
 * 1.用户名不能为空
 * 2.密码不能为空
 * 3.两次密码不一致
 * 
 * 1. 用户已注册
 *      数据库查询
 */

router.post('/user/register',function(req,res,next){
  console.log(req.body);
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;
  //用户名是否为空
  if(username==""){
    responseData.code=1;
    responseData.message="用户名为空";
    res.json(responseData);
    return;
  }
  //密码是否为空
  if(password==""){
    responseData.code=2;
    responseData.message="密码为空";
    res.json(responseData);
    return;
  }
  //密码是否为空
  if(repassword==""){
    responseData.code=2;
    responseData.message="密码为空2";
    res.json(responseData);
    return;
  }
  //密码是否一致
  if(repassword!=password){
      responseData.code=3;
      responseData.message="密码输入不一致";
      res.json(responseData);
      return;
  }
  //用户名是否注册
  User.findOne({
    username:username
  }).then(function(userInfo){
    console.log(userInfo);
    if(userInfo){
      responseData.code = 4;
      responseData.message="用户已注册";
      res.json(responseData);
      return;
    }
    //保存用户注册信息
    var user = new User({
        username: username,
        password: password
    });
    return user.save();
  }).then(function(newUserInfo){
    responseData.message='注册成功';
    res.json(responseData);
  });
}) 

/*
 * 登录
 * 1.用户名不能为空
 * 2.密码不能为空
 *
 * 
 * 1. 用户未注册
 *      数据库查询
 */
router.post('/user/login',function(req,res,next){
  console.log(req.body);
  var username=req.body.username;
  var password=req.body.password;

  if(username==""){
    responseData.code=1;
    responseData.message="用户名为空";
    res.json(responseData);
    return; 
  }

  if(password==""){
    responseData.code=2;
    responseData.message="密码不能为空";
    res.json(responseData);
    return;
  }

  User.findOne({
    username:username
  }).then(function(userInfo){
    console.log(userInfo);
    if(userInfo){
      if(userInfo.password==password){
        responseData.code = 0;
        responseData.message="登录成功";
        res.json(responseData);
        return;
      }else{
        responseData.code = -1;
        responseData.message='密码错误';
        res.json(responseData);
        return 
      }   

    }
    
    return userInfo;

  }).then(function(newUserInfo){
    responseData.code = -1;
    responseData.message='用户不存在';
    res.json(responseData);
  });

})

router.post('/news/add',function(req,res,next){
  console.log(req.body);
  var title=req.body.title;
  var author=req.body.author;
  var content=req.body.content;

  if(title==""||title==undefined){   
    responseData.code=1;
    responseData.message="标题不能为空";
    res.json(responseData);
    return res.status(200).json(responseData); ; 
  }

  if(content==""||content==undefined){
    responseData.code=2;
    responseData.message="内容不能为空";
    res.json(responseData);
    return res.json(responseData);
  }
  var data={
      title: title,
      author:author||"",
      content: content
  }
   console.log(JSON.stringify(data)+"41");
  //保存添加内容
  var news = new News({
      title: title,
      author:author||"",
      content: content
  });
  console
  news.save();
  responseData.code=0;
  responseData.message='添加成功';  
  res.json(responseData);
  return res.status(200).json(responseData); ; 
})

router.post('/news/edit',function(req,res,next){
  //console.log(req.body);
  var id=req.body.id;
  var title=req.body.title;
  var author=req.body.author;
  var content=req.body.content;
  var upItem=req.body;
  if(id==""||id==undefined){   
    responseData.code=1;
    responseData.message="参数id不存在";
    res.json(responseData);
    return  
  }
  delete upItem.id 

  News.update({'_id':id},upItem,function(err,msg){
    if(err){
      responseData.code = -1;
      responseData.message='修改失败';
       res.json(responseData); 
      return 
    }else{
      console.log(msg)
      responseData.code = 0;
      responseData.message='修改成功';
       res.json(responseData); 
       return 
    }  
    
  })
    
  
   
})

router.get('/news/get',function(req,res,next){
   console.log(req.query);
   var conditions={};
   if(req.query){
      conditions=req.query;
   }
   News.find(conditions).then(function(newUserInfo){   
    responseData['data']=newUserInfo;
    responseData.message='ok';
    res.json(responseData);   
  });
})

router.post('/news/delete',function(req,res,next){
 
  var id=req.body.id;
  console.log('id:'+id);
  try{
    News.remove({_id: id }, function (err) {
      if(err){
        console(err+'err');
      }
    })
    responseData.message='删除成功';
    res.json(responseData);

  }catch(err){

    console.log('删除失败', err);
    responseData.message='删除失败';
    res.json(responseData);
  }   
})
  
  







module.exports = router;