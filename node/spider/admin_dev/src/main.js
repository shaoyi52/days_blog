/*
 * @Author: your name
 * @Date: 2020-03-07 12:22:36
 * @LastEditTime: 2021-11-14 22:05:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \spider\admin_dev\src\main.js
 */
import Vue from "vue";

import { router } from "./router/index";
import { appRouter } from "./router/router";
import store from "./store";
import App from "./app.vue";
// import '@/locale';

import "iview/dist/styles/iview.css";
import "./styles/common.less";
import "./libs/prototype";
import iView from "iview";

import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
// import VueI18n from 'vue-i18n';
// import util from './libs/util';
// Vue.use(VueI18n);
Vue.use(iView);
Vue.use(ElementUI);
window.timotaoAdmin = new Vue({
  el: "#app",
  router: router,
  store: store,
  render: (h) => h(App),
  data: {
    currentPageName: "",
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
    this.$store.commit("initCachepage");
    // 权限菜单过滤相关
    this.$store.commit("updateMenulist");
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created() {
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
    });
    this.$store.commit("setTagsList", tagsList);
  },
});
