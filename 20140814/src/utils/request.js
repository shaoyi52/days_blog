import axios from 'axios'
import { Message } from 'element-ui'
import store from  '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance 
const service = axios.create({
  timeout: 5000
})

//添加请求拦截器
service.interceptors.request.use(config=>{
    if(store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config 
  },error=>{
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response=>response,
  error =>{
    console.log('err' + error) //for debug
    return Promise.reject(error)
  }
)

export default service



