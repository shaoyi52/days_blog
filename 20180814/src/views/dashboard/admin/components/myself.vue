<template>
  <div class="self">
    <el-card>
      <a slot="header" class="box-card-header" >
        <img src="~@/assets/img/timg.jpg" width="100%">
      </a>
      <div>
        <div class="name"> shaoyi52</div>
        <div class="text">如果你不在乎改进自己，你永远都不会取得成功</div>
        <div class="info">
          <div>
            <i class="icon-location"></i>
            <a href="javascript:void(0)">深圳</a>            
          </div>
          <div>
            <i class="icon-QQ"></i>
            <el-tooltip effect="dark" content="复制" placement="top">
              <a href="javascript:void(0)">827048849</a>
            </el-tooltip>  
          </div>
          <div>
            <i class="icon-youjian"></i>
            <el-tooltip effect="dark" content="发送邮件" placement="top">
              <a href="mailto:827048849@qq.com">827048849@qq.com</a>
            </el-tooltip>  
          </div>
          <div>
           <i class="icon-weibiaoti4"></i>
            <el-tooltip effect="dark" content="博客" placement="top">
              <a href="http://shaoyi52.github.io" target="_blank">http://shaoyi52.github.io</a>
            </el-tooltip>
          </div>                     
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
export default {
  name: 'card',
  data() {
    return {
     
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" >
$color4: #34bfa3;
.self{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  .el-card__header {
    padding: 0;
    border: none;
     .box-card-header {
      position: relative;
      height: 160px;
        img{
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
            transform: scale(1.1, 1.1);
            filter: contrast(130%);
        }
      }
     }
  }
  .el-card__body{
    font-size:14px;
    line-height:1.5;
    color:#24292e;
    
    .name{
      margin-bottom: 16px;
      font-size: 20px;
      font-weight:300;
      line-height:24px;
      color:#666
    }
    .text {
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(27, 31, 35, 0.2);
    }

  }
  
  }
</style>
