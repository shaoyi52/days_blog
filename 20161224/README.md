  
  指令使用
  <pager options="pagerConfig" on-page-changed="pagerChange(type, pageParam)">  </pager>


  /*指令分页配置
   *
   *依赖文件common/directive/angular-pager
   *
   */       
  $scope.pagerConfig = {  
    total: 300,  
    pageList: [15, 25, 35,45,55]  
  }  

  $scope.pagerChange = function(type, pageParam) {  
    console.info(type);  
    console.info(pageParam); 
  }  


重要文件：
  angular-pager.js      [文件所在scripts\common\directive]
  angular-pager.html    [文件所在views\common]