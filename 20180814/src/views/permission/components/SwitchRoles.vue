<template>
  <div>
    <div style="margin-bottom:15px">roles: {{roles}}</div>
    switchRoles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor"></el-radio-button>
      <el-radio-button label="admin"></el-radio-button>
    </el-radio-group>  
  </div>
</template>
<script>
  export default {
    computed: {
      roles(){
        return this.$store.getters.roles
      },
      switchRoles:{
        get(){
          return this.roles[0]
        },
        set(val){
          console.log("set")
          this.$store.dispatch('ChangeRoles',val).then(()=>{
            console.log("change")
            this.$emit('change')
          })
        }
      }
    },

  }
</script>