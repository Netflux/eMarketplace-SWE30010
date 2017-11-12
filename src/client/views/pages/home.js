import './css/HomePage.css'

const home = {
	templateUrl: 'templates/pages/HomePage.html',
	controller: ['$http', function($http) {
		const ctrl = this
		ctrl.banners = []
		$http.get('/api/homebanners')
			.then(function success(response) {
				ctrl.banners = response.data.data
			})
	}]
}

export default home
