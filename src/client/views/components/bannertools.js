import './css/BannerTools.css'

const bannertools = {
	templateUrl: 'templates/components/BannerTools.html',
	controller: ['$http', function($http) {
		const ctrl = this
		ctrl.banners = { isLoading: true }
		ctrl.reload = () => {
			ctrl.banners.isLoading = true
			$http.get('/api/homebanners')
				.then(function success(response) {
					ctrl.banners = {
						isLoading: false,
						items: response.data.data
					}
				}, function failure() {
					ctrl.banners = {
						isLoading: false,
						items: []
					}
				})
		}
		ctrl.submit = () => {
			const formData = new FormData(document.forms.namedItem('addBanner'))
			$http.post('/api/homebanners', formData, { headers: { 'Content-Type': undefined } })
				.then(function success() {
					ctrl.reload()
				})
		}
		ctrl.delete = bannerId => {
			$http.delete(`/api/homebanners/${bannerId}`)
				.then(function success() {
					ctrl.reload()
				})
		}

		ctrl.reload()
	}]
}

export default bannertools
