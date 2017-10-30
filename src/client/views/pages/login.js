import './css/LoginPage.css'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	bindings:{
		user: '='
	},
	controller: ['$http', '$location', function($http, $location){
		
		this.user = {
			username: this.username,
			password: this.password
		}
		
		this.login = function(){
			if(this.user.username == 'test' && this.user.password == 'test'){
				$http({withCredentials: true, method:'POST', url:'api/users/login', data: this.user})
					.then(function successCallback(response) {
					alert("Login Success")
					$location.path("/account")
				  }, function errorCallback(response) {
					alert("Can't do that right now. Try again later")
				  });
			}
		}
	}]
}

export default login