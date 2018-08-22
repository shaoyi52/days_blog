<template>

  <div v-if="!item.hidden&& item.children" class="menu-wrapper">
    <router-link v-if="hasOneShowingChild(item.children)" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="onlyOneChild.name">
          <template slot="title">
            <i :class="onlyOneChild.meta.icon"></i>
            <span slot="title">{{onlyOneChild.name}}</span>
          </template>        
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <span v-if="item.meta&&item.meta.title"> {{item.meta.title}}</span>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
         <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="child.path"></sidebar-item>
        <router-link :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="child.path">
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>

    </el-submenu>
    
  </div>  
  
</template>

<script>
import path from 'path'  
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath:{
      type: String,
      default:''
    },
    isNest: {
      type: Boolean,
      default: false
    },
    routers:{
      type:Array
    }
  },
  data(){
    return {
      onlyOneChild:null
    }
  },
  methods:{
    hasOneShowingChild(children){
      const showingChildren = children.filter(item=>{
        if(item.hidden){
          return false
        }else{
          this.onlyOneChild = item
          return true
        }
      })
      if(showingChildren.length===1){
        return true
      }else{
        return false
      }
    },
    resolvePath(...paths){
      return path.resolve(this.basePath,...paths)
    }
  },
  mounted() {
    //console.log("routers:",this.routers)
    //console.log(this.item)
  },

}
</script>