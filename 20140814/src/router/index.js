import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'

Vue.use(Router)

export const constantRouterMap=[
  //{path: '/',name: 'HelloWorld',component: HelloWorld,hidden:true},
  {path: '/login',name: 'Login', component: Login,hidden:true},
  {path: '/',component: Layout,redirect: 'dashboard',children: [{
      path: 'dashboard',
      name:"dashboard",
      component: () => import('@/views/dashboard/index'),
      meta:{title:'dashboard',icon:'icon-tubiaozhuzhuangtu',noCache:true}

    }]
  },
  {
    path:'/documentation',
    component:Layout,
    redirect:'/documentation/index',
    children:[{
      path:'index',
      component:() => import('@/views/documentation/index'),
      name:'documentation',
      meta:{title:'documentation',icon:'icon-tubiaozhuzhuangtu',noCache:true}
    }]
  },
    {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  }
  
  //{ path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap=[

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'icon-table1'
    },
    children: [
      { path: 'page', component: () => import('@/views/permission/page'), name: 'page', meta: { title: 'page',roles:['admin'] }}  
    ]
  },{
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'icon-table1'
    },
    children: [
      { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }},  
      { path: 'tree-table', component: () => import('@/views/table/tree-table'), name: 'treeTable', meta: { title: 'treeTable' }}  ]  
  },
  {
    path: '/I18n',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/i18n-demo/index'),
      name: 'I18n',
      meta: { title: 'I18n', icon: 'I18n', noCache: true }
    }]
  }
  ] 

export default new Router({
  routes: constantRouterMap
})
