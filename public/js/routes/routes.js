angular.module('appRoutes',['ngRoute'])
	.config(function($routeProvider,$locationProvider){
		$routeProvider
			.when('/',{
				templateUrl:'/views/pages/home.html'/*,
				controller:'MainController',
				controllerAs:'main'*/
			})/*
			.when('/login',{
				templateUrl: '/views/pages/login.html'
			})*/
			.when('/signup',{
				templateUrl:'views/pages/signup.html'
			})
			

		/*Description
		If you configure $location to use html5Mode (history.pushState), you need to specify the base URL for the application with a <base href=""> tag or configure $locationProvider to not require a base tag by passing a definition object with requireBase:false to $locationProvider.html5Mode():

		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
		Note that removing the requirement for a <base> tag will have adverse side effects when resolving relative paths with $location in IE9.

		The base URL is then used to resolve all relative URLs throughout the application regardless of the entry point into the app.

		If you are deploying your app into the root context (e.g. https://myapp.com/), set the base URL to /:

		<head>
		  <base href="/">
		  ...
		</head>*/


		//used the <base href="/" in index.html file
		$locationProvider.html5Mode({      
		  enabled: true,
		  requireBase: true
		});

	})