export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_CATEGORIES_ERROR = 'RECEIVE_CATEGORIES_ERROR'
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

export const fetchCategories = ($store, $http) => {
	const isFetching = $store.getState().categories.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_CATEGORIES
		})
		$http.get('/api/categories')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_CATEGORIES,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_CATEGORIES_ERROR
				})
			})
	}
}
