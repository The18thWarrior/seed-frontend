'use strict';

angular.module('app', [
	'ui.router',
	'app.loginControllers',
	'app.fullControllers',
	'app.services',
	'app.directives'
]).
config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/users');
    
    $stateProvider
    .state('users', {
        url: '/users',
        templateUrl: '../views/home/login.html',
        controller: 'loginController',
        data: {
         title: 'Blockchain App'
        }     
    })
    .state('users.register', {
      url: '/register',
      templateUrl: '../views/home/register.html',
      controller: 'registerController',
      data: {
       title: 'Blockchain App Register'
      }
    })
    .state('users.forgot', {
      url: '/forgot',
      templateUrl: '../views/home/forgot.html',
      controller: 'forgotController',
      data: {
       title: 'Blockchain App Password Reset'
      }
    })
    .state('users.reset', {
      url: '/reset/:id',
      templateUrl: '../views/home/reset.html',
      controller: 'resetController',
      data: {
       title: 'Blockchain App Password Reset'
      }
    })
    .state('account', {
      url: '/account/:id',
      views: {
        '': {
          templateUrl: '../views/dashboard/header.html',
          controller: 'pagesController'
        },

        'pageView@account': { 
            templateUrl: '../views/dashboard/account.html',
            controller: 'accountController'
        }
      }
    });
});
