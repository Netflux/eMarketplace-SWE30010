import './css/SignupPage.css'

const signup = {
	templateUrl: 'templates/pages/SignupPage.html',
	bindings:{
		user: '='
	},
	controller:['$http', function($http) {
		
		this.user = {
			username: this.name,
			password: this.password,
			email: this.email,
			tnc: this.tnc
		}

		this.submit = function() {
			$http({
				method: 'POST',
				url: '/api/users',
				data: this.user,
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
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
