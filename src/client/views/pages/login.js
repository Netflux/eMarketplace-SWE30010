import './css/LoginPage.css'

import { fetchLogin, fetchLogout } from 'client/logic/actions/account'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location) {
		this.$onDestroy = $store.subscribe(state => {
			//login function
			this.login = function() {
				const user = {
					username: this.username,
					password: this.password
				}
				fetchLogin($store, $http, user)
			}
			//logout function
			this.logout = function() {
				fetchLogout($store, $http)
			}

			if (state.account.isLoggedIn) {
				$location.path('/account')
			}
		})
	}]
}

export default login
