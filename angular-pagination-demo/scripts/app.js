define(['common', 'angular'], function(angularAMD) {
	'use strict';
	var pcProject = angular.module('pcProject', ['ui.router']);
	pcProject.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		}
	]);

	pcProject.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', angularAMD.route({ //模板页
					url: '/home',
					templateUrl: 'views/home/home.html',
					controllerUrl: 'home/controller/home-controller',
					controller: 'homeController'
				}))


			$urlRouterProvider.otherwise('/home');
		}
	]);
	return angularAMD.bootstrap(pcProject);

});