angular.module('mainCtrl',[])
.controller('MainController',function($rootScope,$location,Auth){
	var vm = this;
	vm.loggedIn = Auth.isloggedIn();
	$rootScope.$on('$routeChangeStart',function(){
		vm.loggedIn = Auth.isloggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});
	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';
		Auth.login(vm.loginData.username,vm.loginData.password)
			.success(function(data){
				vm.processing = false;
				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});
				if(data.success)
					$location.path('/');
				else
					vm.error = data.message;
			});
	}

	vm.doLogout = function(){
		Auth.Logout();
		$location.path('/logout');
	}
});