angular.module('app.services', []).
factory('AdminService', function ($http) {

	var pAdmin = {};
	var base_url = 'http://localhost:3000';

	pAdmin.fileUploaded = '';

	pAdmin.login = function(username, password) {
		return $http({
			method: 'POST',
			url: base_url + '/api/login',
			data: { un: username, pw: password },
			withCredentials : true
		});
	}

	pAdmin.logout = function() {
		return $http({
			method: 'GET',
			url: base_url + '/api/logout',
			withCredentials : true
		});
	}

	pAdmin.passwordResetCreate = function(email) {
		return $http({
			method: 'POST',
			url: base_url + '/api/passwordResetCreator',
			data: {
				un: email
			},
			withCredentials : true
		});
	}

	pAdmin.passwordValidate = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/passwordResetValidator/' + id,
			withCredentials : true
		});
	}

	pAdmin.setPassword = function(email, password) {
		return $http({
			method: 'POST',
			url: base_url + '/api/passwordReset',
			data: {
				un: email,
				pw: password
			},
			withCredentials : true
		});
	}

	pAdmin.register = function(userdetails) {
		return $http({
			method: 'POST',
			url: base_url + '/api/account/create',
			data: { 
				accountData: {
					email: userdetails.email,
  			first: userdetails.first,
  			last: userdetails.last,
  			pass: userdetails.pass,
  			type: userdetails.type
				}
			},
			withCredentials : true
		});
	}

	

	// Get account representation
	pAdmin.getAccount = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/account/' + id,
			timeout: 5000,
			withCredentials : true
		});
	}

	// Update account
	pAdmin.updateAccount = function(account) {
		return $http({
			method: 'POST',
			url: base_url + '/api/account/update/',
			data: { accountData: account },
			withCredentials : true
		});
	}


	return pAdmin;
})
.factory('accountInfo', function() {
	var object = {};

	return {
	    setObject: function(newObj) {
	      object = newObj;
	      return true;
	    },
	    getObject: function() {					    	
	      return object;
	    }
	};
})
.factory('loggedUser', function() {
	var objectTyper = {};

	return {
	    setObject: function(newObj) {
	      objectTyper = newObj;
	      return true;
	    },
	    getObject: function() {					    	
	      return objectTyper;
	    }
	};
});

