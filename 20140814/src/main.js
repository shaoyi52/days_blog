// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.scss';
import store from './store/index.js'
import './mock/' // simulation data

import './permission.js'
import i18n from  './lang/index.js'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  router,  
  components: { App },
  template: '<App/>'
}) 
