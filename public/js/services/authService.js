 var authFactory = {};
 angular.module('authService',[])

 .factory('Auth',function($http,$q, AuthToken){
 	authFactory.login = function(username,passowrd){
 		return $http.post('/api/login',{
 			username:username,
 			passowrd:passowrd
 		})
 		.success(function(data){
 			AuthToken.setToken(data.token);
 			return $http.get('/'); 
 			/*return data;*/
 		})
 	}
	 	authFactory.logout = function(){
	 		AuthToken.setToken();
	 	}	 	
 	

 	authFactory.isloggedIn = function(){
 		if(AuthToken.getToken())
 			return true;
 		
 		else
 			return false;
 	}	
 	
 	authFactory.getUser = function(){
 		if(AuthToken.getToken())
 			return $http.get('/'); 		
 		else
 			return $q.reject({message:"user has no token"}); 		
 	}
 	return authFactory;
 })

 .factory('AuthToken',function($window){
 	var authTokenFactory = {};
 	
 	authTokenFactory.getToken = function(){
 		return $window.localStorage.getItem('token');
 	}

 	authFactory.setToken = function (token){
 		if(token)
 			$window.localStorage.setItem('token',token);
 		else
 			$window.localStorage.removeItem('token');

 	}
 	return authTokenFactory;
 })

 .factory('AuthInterceptor',function($q,$location,AuthToken){
 	
 	var interceptorFactory={};

 	interceptorFactory.request = function(config){
 		var token = AuthToken.getToken();
 		if(token){
 			config.headers['x-access-token'] = token;
 		}
 		return config;
 	};
 	interceptorFactory.responseError = function(response){
 		if(response.status ==403)
 			$location.path('/login');

 		return $q.reject(response);
 	} 
 	return interceptorFactory
 });