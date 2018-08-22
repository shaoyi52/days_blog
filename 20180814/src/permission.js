import router from './router'
import store from './store'
import { asyncRouterMap, constantRouterMap } from '@/router'
import {getToken} from '@/utils/auth'


// permission judge function 
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login','authrediret'] //no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log("asyncRouterMap",asyncRouterMap)
  if(getToken()){
    console.log(to.path)
    if(to.path ==='/login'){
      next({ path: '/' })
    }else{
      if(store.getters.roles.length===0){
        store.dispatch("GetUserInfo").then(res=>{
          const roles = res.data.roles
          store.dispatch('GenerateRoutes',{roles}).then(()=>{
            console.log("GenerateRoutes")
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) 
          })
          
        })
      }else{
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        
      }
      
    }
  }else{
    if(whiteList.indexOf(to.path)!==-1){
      next()
    }else{
       next('/login')
    }
  }
  //router.addRoutes(asyncRouterMap)
  //next({ ...to, replace: true })
})