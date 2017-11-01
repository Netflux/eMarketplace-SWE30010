import './css/LoginPage.css'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location){
		this.$onDestroy = $store.subscribe(state =>{
		
		this.login = function(){
			
			this.user ={
				username: this.username,
				password: this.password
			}
			console.log(this.user)
			
			$http({withCredentials: true, method:'post', url:'api/users/login', data: this.user, headers: {'Content-Type': 'application/json'}})
				.then(function successCallback(response) {
					alert("Login Success")
					$location.path("/account")
			  }, function errorCallback(response) {
					alert("Can't do that right now. Try again later")
			  })
			
		}
		
		this.logout = function(){
			$http({withCredentials: true, method:'post', url:'api/users/logout'})
				.then(function successCallback(response) {
					alert("LOGOUT Success")
			  }, function errorCallback(response) {
					alert("Can't logout right now. Try again later")
			  })
		}
		})
	}]
}

export default login