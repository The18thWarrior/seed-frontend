angular.module('app.loginControllers', []).
controller('loginController', function ($scope, AdminService, $state, loggedUser) {
	$scope.isLoggedIn = false;
	$scope.loginError = false;

	$scope.$on('$locationChangeStart', function(event) {
	    var loginsee2 = $state;
	    console.log($state.current["controller"]);
	    if ($state.current["controller"] === 'loginController') {
	    	$('#login-div').css("display", "block");
	        $('#forgot-holder').css("display", "none");
	    } else if ($state.current['name'] === 'users.forgot' || $state.current['name'] === 'users.reset' || $state.current['name'] === 'users.register') {
	    	//console.log(loginsee2.current["name"]);
	    	$('#login-div').css("display", "none");
		    $('#forgot-holder').css("display", "block");
	    }
	    
	    window.setTimeout(function(){
	    	if ($state.current["controller"] === 'loginController') {
		    	$('#login-div').css("display", "block");
		        $('#forgot-holder').css("display", "none");
		    } 
	    }, 500);
	});

	$scope.doLogin = function() {
		AdminService.login($scope.pxl_username.toLowerCase(), $scope.pxl_password).success(function(response) {
			console.log(response);
			if (response._id) {
				$scope.isLoggedIn = true;
				$scope.loginError = false;
				loggedUser.setObject(response);
				$('#login-btn').prop('disabled', false);	
				$state.go('account', {id: response._id});				
			} else {
				console.log('failure in response');
				console.log(response);
				$scope.isLoggedIn = false;
				$scope.loginError = true;
				$('#login-btn').prop('disabled', false);
				console.log('calling logout');
				AdminService.logout().success(function(response) {
					console.log(response);
				});
				console.log('failed login');
			}			
		}).error(function(err) {
			console.log(err);
			console.log('failure in login, error returned');
			$scope.isLoggedIn = false;
			$scope.loginError = true;
			console.log('failed login');
			$('#login-btn').prop('disabled', false);
			AdminService.logout().success(function(response) {
				console.log(response);
			});
		});
	}
	
}).
controller('registerController', function ($scope, AdminService, $state) {
	$scope.isRegistered = false;
	$scope.remember_details = false;
	// Transition for Registration
	// $scope.registerActionPerformed = false;
	$scope.$on('$locationChangeStart', function(event) {
  
	});

	$scope.$on('$viewContentLoaded', function(){
  var loginsee2 = $state;
  console.log($state.current["controller"]);
  if ($state.current['name'] === 'users.forgot' || $state.current['name'] === 'users.reset' || $state.current['name'] === 'users.register') {
  	//console.log(loginsee2.current["name"]);
  	$('#login-div').css("display", "none");
   $('#forgot-holder').css("display", "block");
  }
 });

	$scope.doRegister = function() {
		if ($scope.userdetails.email != null) {
			// Transition for Registration
			$scope.registerActionPerformed = true;
			AdminService.register($scope.userdetails).success(function(response) {
				$scope.isRegistered = true;
				// $timeout(function() { $scope.isRegistered = false }, 2000)
				$scope.registeredUser = $scope.userdetails.first;
				// Transition for Registration
				$scope.registerActionPerformed = false;
				//$state.go('account', {id: response._id});
				var newUrl = window.location.host;
				$scope.doLogin($scope.userdetails.email, $scope.userdetails.pass);
			}).error(function(response2) {
			});
		} else {
			$("#registerValidation").css("display", "block");
		}		
	};

	$scope.doLogin = function(un, pw) {
		AdminService.login(un, pw).success(function(response) {
			console.log(response);
			if (response._id) {
				$scope.isLoggedIn = true;
				$scope.loginError = false;
				$('#login-btn').prop('disabled', false);
				$state.go('account', {id: response._id});
				
			} else {
				console.log('failure in response');
				console.log(response);
				$scope.isLoggedIn = false;
				$scope.loginError = true;
				$('#login-btn').prop('disabled', false);
				console.log('failed login');
			}			
		}).error(function(err) {
			console.log(err);
			console.log('failure in login, error returned');
			$scope.isLoggedIn = false;
			$scope.loginError = true;
			console.log('failed login');
		});
	}


}).
controller('forgotController', function ($scope, AdminService, $state) {
	$scope.pxl_email = '';
	$scope.forgotError = false;
	// Transition for Registration
	// $scope.registerActionPerformed = false;
	

	$scope.resetPassword = function() {
		// Transition for Registration
		$scope.passwordResetPerformed = true;
		AdminService.passwordResetCreate($scope.pxl_email).success(function(response) {
			// $timeout(function() { $scope.isRegistered = false }, 2000)
			console.log(response);
			if (response) {
				$("#forgot-form").html('<div style="margin-left:auto;margin-right:auto;width:75%;margin-top:17%;"><h2 style="font-family:Raleway;text-align:center;">Password Reset Email Sent</h2></div>');
			} else {
				$scope.forgotError = true;
				//$scope.apply();
			}
		});
	}
}).
controller('resetController', function ($scope, AdminService, $stateParams, $state) {
	$scope.pxl_pwd = '';
	$scope.pxl_pwdcheck = '';
	$scope.resetError = false;
	$scope.pxl_un = '';
	$scope.passwordvalidator = false;
	$scope.passwordlength = false;
	//var url = window.location.href;
	//var hash = url.substring( url.indexOf('?') + 1 );
	var hash = $stateParams.id;
	console.log(hash);

	AdminService.passwordValidate(hash).success(function (response) {
		console.log(response);
		if (response._id != null) {
			$scope.pxl_un = response.email;
		} else {
			$("#reset-form").html('<div style="margin-left:auto;margin-right:auto;width:75%;margin-top:17%;"><h2 style="font-family:Raleway;text-align:center;">Invalid Password Reset Link</h2></div>');
		}
	}).error(function(error) {
		console.log(error);
	});

	
	// Transition for Registration
	// $scope.registerActionPerformed = false;
	$scope.resetPassword = function() {

		if ($scope.checkPassword()) {
			// Transition for Registration
			$scope.passwordResetPerformed = true;
			AdminService.setPassword($scope.pxl_un, $scope.pxl_pwd).success(function(response) {
				// $timeout(function() { $scope.isRegistered = false }, 2000)
				if (response) {
					$state.go('account', {id: response._id});
				} else {
					$scope.resetError = true;
					$scope.apply();
				}
			});
		} else {
			return false;
		}
		
	}

	$scope.checkPassword = function() {
		// Transition for Registration
		if ($scope.pxl_pwd == $scope.pxl_pwdcheck) {
			if ($scope.pxl_pwd.length > 4) {				
				return true;
			} else {
				$scope.passwordlength = true;
				return false;
			}
		} else {
			$scope.passwordvalidator = true;			
			return false;
		}
		
	};
});
