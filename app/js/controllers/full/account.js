angular.module('app.fullControllers', []).
controller('accountController', function ($scope, $stateParams, AdminService){

	/* ======================================
		VARIABLE DECLARATION & INITIALIZAT
	========================================= */

	// $scope.selectedIndex = 0;
	$scope.id = $stateParams.id;
	if ($scope.id == null) {
		window.location('/');
	}

	$scope.editAccount = {};
	$scope.passwordvalidator = '';
	$scope.passwordchange = '';

	$scope.$on('$viewContentLoaded', function() {
  AdminService.getAccount($scope.id).success(function(response) {
			$scope.account = $.extend({},response);
			delete $scope.account.contactPass;
			//$scope.editAccount = response;
		}).error(function(err1) {
			window.location = "/";
		});
    });

	/* ======================================
		CONTROLLER ACTIONS
	========================================= */
	$scope.editAccountModal = function() {
		$('#edit-account').modal('show');
	};

	$scope.doAccountUpdate = function() {
		AdminService.updateAccount($scope.editAccount).success(function(response2) {
			$('#edit-account').modal('hide');
			AdminService.getAccount($scope.id).success(function(response) {
				$scope.account = $.extend({},response);
				delete $scope.account.pass;
				$scope.editAccount = $.extend({},response);

			}).error(function(err1) {
				window.location = "/";
			});
		}).error(function(err2) {
			$scope.editAccount = $.extend({},$scope.account);
		});
	};

	$scope.cancelUpdate = function() {
		$scope.editAccount = $.extend({},$scope.account);
	};

	$scope.changePassword = function() {
		if ($scope.passwordchange == $scope.passwordvalidator) {
			console.log('password validated');
			AdminService.setPassword($scope.account.email, $scope.passwordchange).success(function(response) {
				console.log('password set');
				$scope.passwordchange = '';
				$scope.passwordvalidator = '';
				$("#passwordError").css("display", "none");
				$("#passwordChange").collapse('hide');

			}).error(function(err1) {
				$("#passwordError").css("display", "block");
			});
		} else {
			$("#passwordError").css("display", "block");
		}
	}

	$scope.cancelUpdate = function() {
		$scope.editAccount = $.extend({},$scope.account);
	};

	/* ======================================
		SERVICE CALLS
	========================================= */

	AdminService.getAccount($scope.id).success(function(response) {
		$scope.account = response;
		delete $scope.account.pass;
		$scope.editAccount = $.extend({},response);

	}).error(function(err1) {
		window.location = "/";
	});
}).
controller('pagesController', function ($scope, $stateParams, AdminService, accountInfo, $location, $window) {
 $scope.variables = { accountCreatives: null }
 $scope.pageActions = { reloadImages: false, pageImages: false };
 $scope.id = $stateParams.id;
 $scope.imageSelected = false;
 $scope.files = [];
 $scope.selectedUploadImage = {};
 $scope.isValidImage = true;
 $scope.pagesAccount = {};
 $scope.loggedIn = false;

 $scope.logout = function() {
  console.log('calling logout');
  AdminService.logout().success(function(response) {
   console.log(response);
   if (response) {
    window.location = "/";
   }
  });
 }

 console.log('getting account');
 AdminService.getAccount($scope.id).success(function(response) {
  console.log('getting account2');
  $scope.pagesAccount = response;
  delete $scope.pagesAccount.pass;
  $scope.loggedIn = true;
  accountInfo.setObject();
 }).error(function(err1) {
  window.location = "/";
 });
});
