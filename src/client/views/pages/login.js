import './css/LoginPage.css'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location){
		this.$onDestroy = $store.subscribe(state =>{
			
			this.user = {
				username: this.username,
				password: this.password
			}
		
		this.login = function(){
			console.log(this.user)
				$http({withCredentials: true, method:'POST', url:'api/users/login', data: this.user})
					.then(function successCallback(response) {
					alert("Login Success")
					$location.path("/account")
				  }, function errorCallback(response) {
					alert("Can't do that right now. Try again later")
				  })
			
		}
		})
	}]
}

export default login