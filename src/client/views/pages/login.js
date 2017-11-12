import './css/LoginPage.css'

import { fetchLogin } from 'client/logic/actions/account'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location) {
		this.$onDestroy = $store.subscribe(state => {
			if (!state.account.isFetching && state.account.isLoggedIn) {
				$location.path('/account')
			}
		})

		this.login = function() {
			const user = {
				username: this.username,
				password: this.password
			}
			fetchLogin($store, $http, user)
		}
	}]
}

export default login
