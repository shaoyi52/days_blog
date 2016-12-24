define(['angularAMD',"common/directive/angular-pager"], function(angularAMD) {
  angularAMD.controller('homeController', ['$scope', '$location',  '$timeout', '$stateParams',
    function($scope, $location, $timeout, $stateParams) {		
		

    /*分页 
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


		
	}])  
})