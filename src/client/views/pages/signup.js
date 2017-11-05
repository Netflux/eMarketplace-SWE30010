import './css/SignupPage.css'

const signup = {
	templateUrl: 'templates/pages/SignupPage.html',
	bindings:{
		user: '='
	},
	controller:['$store', '$http', '$location', function($store, $http, $location) {
	
		this.submit = function() {
			
			this.user = {
				username: this.username,
				password: this.password,
				email: this.email,
				newsletter: this.news ? 1 : 0
			}
			console.log(this.user)
			$http({
				method: 'post',
				url: 'api/users/register',
				data: this.user,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(response) {
				alert("signup Success")
				$location.path("/login")
			  }, function errorCallback(response) {
				alert("Can't do that right now. Try again later")
				alert(response.data)
			  })
		}
	}]
}

export default signup
