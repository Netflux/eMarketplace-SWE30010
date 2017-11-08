import './css/NavBar.css'

import { fetchLogout } from 'client/logic/actions/account'

const navbar = {
	templateUrl: 'templates/components/NavBar.html',
	controller: ['$store', '$http', function($store, $http) {
		const ctrl = this
		ctrl.$onDestroy = $store.subscribe(state => {
			ctrl.isLoggedIn = state.account.isLoggedIn
		})
		ctrl.logout = function() {
			fetchLogout($store, $http)
		}
	}]
}

export default navbar
