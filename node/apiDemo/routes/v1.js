import express from 'express'
const router = express.Router()
//返回统一格式
var responseData;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:'ok'
  }
  next();
})

router.get('/cities',function(req,res){
  responseData['result']=[
    {
      id: 1,
      name: "上海",
      abbr: "SH",
      area_code: "021",
      sort: 1,
      latitude: 31.23037,
      longitude: 121.473701,
      is_map: true,
      pinyin: "shanghai"
    },
    {
    id: 2,
    name: "杭州",
    abbr: "HZ",
    area_code: "0571",
    sort: 8,
    latitude: 30.274151,
    longitude: 120.155151,
    is_map: true,
    pinyin: "hangzhou"
    }
  ]
  res.send(responseData);
})

export default router
