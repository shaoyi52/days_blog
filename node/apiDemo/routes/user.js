'use strict';

import express from 'express'
const router = express.Router()
//返回统一格式
var responseData;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  }
  next();
})

router.get('/', function(req,res){
  responseData['message']='hello world'  
  res.send(responseData);
});
// router.post('/register', Admin.register);


export default router