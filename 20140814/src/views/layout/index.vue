<template>
  <div class="app-wrapper">
    <Sidbar class="sidebar-container"/>
    <div class="main-container">
      <Navbar/>
      <TagsView/>
      <router-view></router-view>
    </div>  
  </div>  
</template>
<script>
import  {Sidbar, Navbar ,TagsView} from './components'  
export default {
  name: 'layout',  
  data () {
    return {
      isCollapse:false,
    }
  },
  components: {
    Sidbar,
    Navbar,
    TagsView
  },  
  mixins: [],
  computed: {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 主体区域
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
    position: relative;
  }
   // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .el-menu {
        border: none;
        height: 100%;
        width: 100%!important;
    }
     .is-horizontal {
        display: none;
      }
  }
</style>