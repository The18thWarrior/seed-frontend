angular.module('app.fullControllers', []).
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
