import './css/AccountPage.css'

const account = {
	templateUrl: 'templates/pages/AccountPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location) {
		const ctrl = this
		ctrl.$onDestroy = $store.subscribe(state => {
			ctrl.account = state.account
			if (!state.account.isFetching && !state.account.isLoggedIn) {
				$location.path('/login')
			}
		})
	}]
}

export default account
