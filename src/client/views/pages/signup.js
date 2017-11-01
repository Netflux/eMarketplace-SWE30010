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
				method: 'POST',
				url: 'api/users/register',
				data: this.user,
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(function successCallback(response) {
					alert("signup Success")
					$location.path("/login")
				  }, function errorCallback(response) {
					alert("Can't do that right now. Try again later")
					alert(response.data)
				  })
		}
	}],
	directive: ['passwordVerify', function() {
		return {
			restrict:'A',
			require:'?ngModel',
			link: function(scope, elem, attrs, ngModel) {
				// do nothing if no ng-model
				if (!ngModel) return

				this.$watch(attrs.ngModel, function() {
					validate()
				})

				// observe the other value and re-validate on change
				attrs.$observe('passwordVerify', function() {
					validate()
				})

				var validate = function() {
					// values
					var val1 = ngModel.$viewValue
					var val2 = attrs.passwordVerify

					// set validity
					ngModel.$setValidity('passwordVerify', val1 === val2)
				}
			}
		}
	}]	
}

export default signup
