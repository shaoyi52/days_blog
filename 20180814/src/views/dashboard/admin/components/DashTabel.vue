<template>
 <el-table :data="list" style="width:100%;padding-top:15px">
  <el-table-column label="Order_No" min-width="200">
    <template slot-scope="scope">
      {{scope.row.order_no}}
    </template>  
  </el-table-column>  
  <el-table-column label="Price" width="195">
    <template slot-scope="scope">
      {{scope.row.price}}
    </template>  
  </el-table-column>  
  <el-table-column label="Status" width="100">
    <template slot-scope="scope">
      {{scope.row.status}}
    </template>  
  </el-table-column>  
 </el-table>
</template>

<script>

import {fetchList} from '@/api/transaction'
export default {
  name: 'card',
  data() {
    return {
     list:null
    }
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 8)
        console.log(this.list);
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  
</style>
