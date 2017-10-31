import { fetchCategories, REMOVE_CATEGORY } from 'client/logic/actions/categories'

const categorytools = {
	templateUrl: 'templates/components/CategoryTools.html',
	controller: ['$http', '$store', function($http, $store) {
		const ctrl = this
		ctrl.$onDestroy = $store.subscribe(state => ctrl.categories = state.categories)
		ctrl.reload = () => fetchCategories($store, $http)
		ctrl.submit = () => {
			const url = ctrl.categoryId ? `/api/categories/${ctrl.categoryId}` : '/api/categories'
			const formData = new FormData(document.forms.namedItem('addCategory'))
			$http.post(url, formData, { headers: { 'Content-Type': undefined } })
				.then(function success() {
					ctrl.categoryId = undefined
					ctrl.reload()
				})
		}
		ctrl.delete = categoryId => {
			$http.delete(`/api/categories/${categoryId}`)
				.then(function success() {
					$store.update({
						type: REMOVE_CATEGORY,
						data: categoryId
					})
				})
		}

		ctrl.reload()
	}]
}

export default categorytools
