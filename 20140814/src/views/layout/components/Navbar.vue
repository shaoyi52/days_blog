<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <span class="quite" @click="logout">退出</span>
<!--       <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown> -->
    </div>
  </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Hamburger from "@/components/Hamburger";
  import Breadcrumb from "@/components/Breadcrumb";
  export default {
    name:"Navbar",
    data(){
      return{
        sidebar:{opened:true}
      }
    },
    components:{
      Hamburger,
      Breadcrumb
    },
    computed:{
      ...mapGetters([
      'name',
      'avatar'
    ])
    },
    methods:{
      toggleSideBar(){
      },
      logout(){
        console.log("LogOut")
        this.$store.dispatch('LogOut').then(() => {
               location.reload()
             })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
}
.right-menu{
  float:right;
  .quite{
    padding:10px;
    cursor: pointer;
  }
}
</style>  