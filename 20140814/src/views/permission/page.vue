<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange"/>
  </div>
</template>

<script>
//import clipboard from '@/utils/clipboard'
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'pagePermission',
  data() {
    return {
      iconsMap: []
    }
  },
  components: {SwitchRoles},
  methods:{
    handleRolesChange(){
      console.log("handleRolesChange")
    }
  }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
