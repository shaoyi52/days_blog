require.config({
	baseUrl: 'scripts/', //基目录
	paths: { //第三方插件
		'angular': '../components/angular/angular.min',
		'angularAMD': '../components/plugs/angularAMD',
		'angular-ui-router':'../components/angular/angular-ui-router.min',	
		'angular-resource':'../components/plugs/angular-resource',
		'ngload': '../components/plugs/ngload',
	},

	shim: { // 配置依赖关系
		'angularAMD': ['angular'],
		'ngload': ['angularAMD'],
		'angular-resource': ['angular'],
		'angular-ui-router': ['angular']
	},

	// 启动app入口
	deps: ['app']
});

