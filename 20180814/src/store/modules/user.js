import {loginByUsername,logout,getUserInfo} from '@/api/login'
import {getToken,setToken,removeToken} from '@/utils/auth'

const user = {
  state:{
    user: '',
    status:'',
    code:'',
    token:getToken(),
    name:'',
    avatar:'',
    introduction:'',
    roles:[],
    setting:{
      articlePlatform: []
    }
  },
  mutations:{
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN:(state,token)=>{
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES:(state,roles)=>{
      state.roles = roles
    }
  },
  actions:{
    //用户名登录
    LoginByUsername({commit},userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve,reject)=>{
        loginByUsername(username,userInfo.password).then(response =>{
          const data = response.data
          commit('SET_TOKEN',data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error =>{
          reject(error)
        })
      })
    },

    //获取用户信息
    GetUserInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        console.log('GetUserInfo')
        getUserInfo(state.token).then(response=>{
          if(!response.data){
            reject('error')
          }
          const data=response.data
          if(data.roles && data.roles.length > 0){
            commit('SET_ROLES',data.roles)
          }else{
            reject('getInfo:roles must be a none-null array!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //用户登出
    LogOut({commit,state}){
      return new Promise((resolve,reject)=>{
        logout(state.token).then(()=>{
          commit('SET_TOKEN','')
          commit('SET_ROLES',[])
          removeToken()
          resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    },

    //动态修改权限
    ChangeRoles({commit},role){
      return new Promise(resolve=>{
        commit('SET_TOKEN',role)
        setToken(role)
        getUserInfo(role).then(response =>{
          const data=response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user