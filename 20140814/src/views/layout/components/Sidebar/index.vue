<template>
  <el-scrollbar  class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      show-timeout="200"
      default-active="true"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      class="el-menu"
      >
      <SidebarItem v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" :routers="permission_routers"/>

<!--         <el-submenu index="1">
  <template slot="title">
    <i class="el-icon-location"></i>
    <span slot="title">导航一1</span>
  </template>
  <el-menu-item index="1-1">选项1</el-menu-item>
  <el-menu-item index="1-2">选项2</el-menu-item>
</el-submenu>
<el-menu-item index="2">
  <i class="el-icon-menu"></i>
  <span slot="title">导航二</span>
</el-menu-item>
<el-menu-item index="3" disabled>
  <i class="el-icon-document"></i>
  <span slot="title">导航三</span>
</el-menu-item>
<el-menu-item index="4">
  <i class="el-icon-setting"></i>
  <span slot="title">导航四</span>
</el-menu-item> -->
    </el-menu>
  </el-scrollbar>
</template>


<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import {constantRouterMap} from '@/router'
  export default {
    data(){
      return {
        isCollapse:false,
        constantRouterMap:constantRouterMap
      }
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
    },    
    components:{
      SidebarItem
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  .scrollbar-wrapper {
     overflow-x: hidden!important;
    .el-scrollbar__view {
      height: 100%;
    }
    .is-horizontal{
      display:none;
    }
  } 
  
 .scrollbar-wrapper {
  .is-horizontal{
      display:none;
    }
  .el-menu {
      border: none;
      height: 100%;
    
      width: 100%!important;
      }
  }

</style>