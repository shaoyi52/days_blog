<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>
<script>
import { asyncRouterMap, constantRouterMap } from '@/router'
import editorDashboard from './editor'
import admin from './admin'
export default {
  name: 'layout',
  data(){
    return {
      its:"return",
      currentRole:'admin'
    }
  },
  components: {
      editorDashboard,
      admin
  },
  mixins: [],
  computed: {
  },
  created() {
    this.its="created"
  },
  methods: {
    initdata(){
      this.its="initData"
      console.log("routers",constantRouterMap)
      return 1
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>