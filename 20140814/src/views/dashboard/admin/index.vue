<template>
  <div class="dashboard-editor-container">    
    <card></card>
    <el-row :gutter="12">
      <el-col :span="12"><dash-table></dash-table></el-col>
      <el-col :span="6"><todo-list></todo-list></el-col>
      <el-col :span="6"><my-self></my-self></el-col>
    </el-row>
          
  </div>
</template>

<script>
import card from './components/card'
import MySelf from './components/myself'
import DashTable from './components/DashTabel'
import TodoList from './components/TodoList'
//import PanThumb from '@/components/PanThumb'
export default {
  name: 'dashboard-admin',
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      name:"yuyi"
    }
  },
  components: { card,MySelf,DashTable,TodoList },
  computed: {
    /*...mapGetters([
      'name',
      'avatar',
      'roles'
    ])*/
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.emptyGif {
		display: block;
		width: 45%;
		margin: 0 auto;
	}

	.dashboard-editor-container {
		background-color: #e3e3e3;
		min-height: 100vh;
		margin-top: -50px;
		padding: 100px 20px 0px;
		.pan-info-roles {
			font-size: 12px;
			font-weight: 700;
			color: #333;
			display: block;
		}
		.info-container {
			position: relative;
			height: 150px;
			.display_name {
				font-size: 48px;
				line-height: 48px;
				color: #212121;
				position: absolute;
				top: 25px;
			}
		}
	}
</style>
