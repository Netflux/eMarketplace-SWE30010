export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const RECEIVE_PRODUCTS_ERROR = 'RECEIVE_PRODUCTS_ERROR'

export const fetchProducts = ($store, $http, categoryId) => {
	const state = $store.getState().products

	if (!state.isFetching) {
		const timestamp = Date.now()
		const url = categoryId ? `/api/categories/${categoryId}/products?timestamp=${state.lastFetched}` : `/api/products?timestamp=${state.lastFetched}`
		$store.update({
			type: FETCH_PRODUCTS
		})
		$http.get(url)
			.then(function success(response) {
				$store.update({
					type: RECEIVE_PRODUCTS,
					data: response.data.data,
					timestamp
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_PRODUCTS_ERROR
				})
			})
	}
}
