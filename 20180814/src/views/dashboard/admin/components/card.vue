<template>
  <el-row :gutter="40" class="count">
    <el-col class="count-item" :xs="24" :sm="12" :lg="6" v-for="(item,index) in list" :key="index" >
      <div class="item-container" :class="`item-container-${index + 1}`">
        <div class="icon"><i :class="item.icon" />  </div>
        <div class="text">
          <div class="title">{{item.title}}</div>
          <count-to class="number" :startVal="0" :endVal="item.endVal" :duration="5000"></count-to>
        </div>
      </div>  
    </el-col>
  </el-row>
</template>

<script>
//import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
export default {
  name: 'card',
  data() {
    return {
     list: [
              {
                  icon: 'icon-yonghu',
                  title: 'Unique Visitor',
                  endVal: 7428
              },
              {
                  icon: 'icon-huihua',
                  title: 'Message',
                  endVal: 2839
              },
              {
                  icon: 'icon-qianfuhao',
                  title: 'Page View',
                  endVal: 182735
              },
              
              {
                  icon: 'icon-qianfuhao',
                  title: 'QQ group',
                  endVal: 338241465
              }
            ]
    }
  },
  components: { CountTo },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$color1: #55c8ca;
$color2: #f7b87f;
$color3: #36a3f7;
$color4: #34bfa3;
.card{padding:0 -20px;}
.count{ 
  .count-item{
      user-select: none;
      margin-bottom: 32px;
      .item-container{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background-color: #f3f4f5;
          border-radius: 6px;
          cursor: pointer;
          &:hover{
              opacity: 0.8;
          }
          &.item-container-1{
              background: $color1;
          }
          &.item-container-2{
              background: $color2;
          }
          &.item-container-3{
              background: $color3;
          }
          &.item-container-4{
              background: $color4;
          }
          .icon{
              padding: 16px;
              border-radius: 6px;
              cursor: pointer;
              transition: all 0.3s ease-out;
              i{
                  font-size: 48px;
                  color: #fff;
              }
          }
          .text{
              text-align: right;
              color: #fff;
              .title{
                  font-size: 16px;
                  margin-bottom: 12px;
              }
              .number{
                  font-size: 20px;
              }
          }
      }
  }
  }
</style>
