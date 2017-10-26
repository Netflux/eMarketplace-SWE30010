export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const RECEIVE_PRODUCTS_ERROR = 'RECEIVE_PRODUCTS_ERROR'

export const fetchProducts = ($store, $http, categoryId) => {
	const isFetching = $store.getState().products.isFetching
	const url = '/api/products'

	if (!isFetching) {
		$store.update({
			type: FETCH_PRODUCTS
		})
		$http.get(url)
			.then(function success(response) {
				$store.update({
					type: RECEIVE_PRODUCTS,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_PRODUCTS_ERROR
				})
			})
	}
}
