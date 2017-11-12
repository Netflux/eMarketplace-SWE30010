import './css/SignupPage.css'

const signup = {
	templateUrl: 'templates/pages/SignupPage.html',
	bindings:{
		user: '='
	},
	controller:['$store', '$http', '$location', function($store, $http, $location) {
		this.$onDestroy = $store.subscribe(state => {
			if (!state.account.isFetching && state.account.isLoggedIn) {
				$location.path('/account')
			}
		})

		this.submit = function() {
			const user = {
				username: this.username,
				password: this.password,
				email: this.email,
				newsletter: this.news ? 1 : 0
			}
			$http({
				method: 'post',
				url: 'api/users/register',
				data: user,
				headers: {'Content-Type': 'application/json'}
			}).then(function successCallback() {
				alert('signup Success')
				$location.path('/login')
			}, function errorCallback() {
				alert('Can\'t do that right now. Try again later')
			})
		}
	}]
}

export default signup
