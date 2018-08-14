<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref='scrollPane' >
      <router-link ref="tag" class="tags-view-item" :to="tag" v-for="tag in Array.from(visitedViews)" :key="tag.title">
        {{tag.title}}
        <span class='icon-i-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{tagsView.close}}</li>
      <li @click="closeOthersTags">{{tagsView.closeOthers}}</li>
      <li @click="closeAllTags">{{tagsView.closeAll}}</li>
    </ul>
  </div>   
</template>
<script>
  import ScrollPane from "@/components/ScrollPane"
  import {mapState} from 'vuex'
  export default {
    name:"TagsView",
    data(){
      return{
        visible:false,
        top: 0,
        left: 0,
        
        tagsView:{
          close:"关闭",
          closeOthers:"关闭其他",
          closeAll:"关闭所有"
        }
      }
    },
    components:{
      ScrollPane
    },
    computed:{
      visitedViews(){
        return this.$store.state.tagsView.visitedViews;
      }
    },
    watch:{
      $route(){

      this.$store.dispatch('addVisitedView',this.$route)         
        console.log("$route:"+this.$route)
      }
    },
    methods:{
      isActive(route) {
        return route.path === this.$route.path
      },
      closeSelectedTag(selectedTag){
        this.$store.dispatch('delVisitedView',selectedTag).then(views=>{
          if(this.isActive(selectedTag)){
            const latestView = views.slice(-1)[0];
            if(latestView){
              this.$router.push(latestView)
            }else{
              this.$router.push("/")
            }
          }
          
        })  
      },
      closeOthersTags(){

      },
      closeAllTags(){

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    .tags-view-wrapper {
      background: #fff;
      height: 34px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        text-decoration:none;
        &:first-of-type {
          margin-left: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>