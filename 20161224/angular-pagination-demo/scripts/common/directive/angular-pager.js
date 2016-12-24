define(['angularAMD'], function(angularAMD) {
	angularAMD.directive('pager', ['$rootScope', 
		function($rootScope) {
			return {
				restrict: 'EA',				
				scope: {
					options: '=options',
					onPageChanged: '&onPageChanged',								
				},				
				replace: true,
				transclude: true,				
				templateUrl: 'views/common/angular-pager.html',	
				link: function($scope,$element,$attrs){
					var opts= {
							total: 0,
							pageList: [10,20,30,50,100,150,200]
					}
					//初始化分页 
					function initPagination() { 
						if($scope.options && $scope.options.pageList && $scope.options.pageList.length <= 0) {
							$scope.options.pageList = opts.pageList;
						} 
						angular.extend(opts, $scope.options);  
						opts.pageSize = opts.pageList[0];  

						$scope.options = opts;
						refreshPagination($scope);  
					};

					//刷新分页  
					function refreshPagination() {
						$scope.options.pageTotal = 0; 
						if(parseInt($scope.options.total) % parseInt($scope.options.pageSize) == 0) {
							$scope.options.pageTotal = parseInt(parseInt($scope.options.total) / parseInt($scope.options.pageSize));
						} else { 
							$scope.options.pageTotal = parseInt((parseInt($scope.options.total) / parseInt($scope.options.pageSize)) + 1);  
						}

						if($scope.options.pageTotal <= 0) {
							$scope.options.pageNumber = 0;
						}else{
							$scope.options.pageNumber =1;
						}
						managePage();
					};

					//下一页
					function nextPage() {
						$scope.options.pageNumber++;
						if($scope.options.pageNumber > $scope.options.pageTotal) {
							$scope.options.pageNumber = $scope.options.pageTotal;
						}
					};
					//上一页
					function previousPage() {
						$scope.options.pageNumber--;
						if($scope.options.pageNumber <= 0) {
							$scope.options.pageNumber = 1;
						}
					}

					//最后一页
					function lastPage() {
						$scope.options.pageNumber = $scope.options.pageTotal; 
					};


					//第一页
					function firstPage() {
						$scope.options.pageNumber = 1; 
					}

					//页跳转	
					function selectPage(pageNum){
						var pageNum = parseInt(pageNum);
						//如果超过最大页或小于第一页则跳过
						if(pageNum>0&&pageNum<= $scope.options.pageTotal) {
							$scope.options.pageNumber = pageNum;
						}
						$scope.options.currentCount="";
					}

					//分页操作
					function onPageChanged(type){

						var pageParam = {
							pageNumber: $scope.options.pageNumber,
							pageSize: $scope.options.pageSize,
							pageTotal: $scope.options.pageTotal,
							total: $scope.options.total
						};	
						managePage();			
						$scope.onPageChanged({type:type,pageParam:pageParam}) ;
					}

					//处理页码
					function managePage() {
						var pageSize = 7 //分页条一页最多显示五个
						$scope.options.pageNums = [];
						var itemArray = [];
						if($scope.options.pageTotal>pageSize) {
							itemArray.push({num: 1,disable:false})
							if($scope.options.pageNumber>4){
									itemArray.push({num: '…',disable:true})//添加省略号按钮
							}else{
								for(var i = 2; i<=5; i++) {
								itemArray.push({
									num: i,
									disable:false
								});
								}
							}
							if($scope.options.pageNumber>4 && $scope.options.pageNumber+4<=$scope.options.pageTotal){
								itemArray.push({num: $scope.options.pageNumber-1,disable:false});
								itemArray.push({num: $scope.options.pageNumber,disable:false});
								itemArray.push({num: $scope.options.pageNumber+1,disable:false});
							}
							if($scope.options.pageNumber+3<$scope.options.pageTotal){
									itemArray.push({num:'…',disable:true})
							}else{
								if($scope.options.pageNumber==5){
									itemArray.push({num: $scope.options.pageNumber-1,disable:false});
									itemArray.push({num: $scope.options.pageNumber,disable:false});
									itemArray.push({num: $scope.options.pageNumber+1,disable:false});
									itemArray.push({num:'…',disable:true})//处理只有8页时候的BUG
								}else{
									for(var i = $scope.options.pageTotal-4; i<$scope.options.pageTotal; i++) {
									itemArray.push({
										num: i,
										disable:false
									});
									}
								}
							}
							itemArray.push({num: $scope.options.pageTotal,disable:false})
						} else {
							for(var i = 1; i <= $scope.options.pageTotal; i++) {
								itemArray.push({
									num: i,
									disable:false
								});
							}
						}
						$scope.options.pageNums = itemArray;
					}

					//分页改变
					$scope.pageChanged = function (type) {
						switch(type) {
							case "nextPage":													
								nextPage();
								break;
							case "lastPage":
								lastPage();
								break;
							case "previousPage":
								previousPage();
								break;
							case "firstPage":
								firstPage();
								break;
							default:
								selectPage(type);
								break;									
						}
						onPageChanged(type);
					}

					//页数改变
					$scope.pageSizeChanged = function (curSize) {
						$scope.options.pageSize = curSize;
						refreshPagination();
						onPageChanged("pageSizeChange")
					}

					$scope.$watch('options', function(newVal, oldVal) {  
            initPagination()  
          })  
			

				}		
			}
		}
	]);
})