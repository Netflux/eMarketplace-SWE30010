export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const RECEIVE_PRODUCTS_ERROR = 'RECEIVE_PRODUCTS_ERROR'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

export const fetchProducts = ($store, $http, categoryId) => {
	const state = $store.getState().products

	if (!state.isFetching) {
		const timestamp = categoryId ? state.lastFetched : Date.now()
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

export const userProducts = (products, userId) => {
	var userproducts = []
	for (var j = 0; j < products.items.length; j++){
		if(products.items[j].userId == userId){
			userproducts.push({
				productId: products.items[j].productId,
				productKey: products.items[j].productKey,
				title: products.items[j].title,
				stock: products.items[j].stock,
				price: products.items[j].price,
				shippingPrice: products.items[j].shippingPrice,
				discount: products.items[j].discount,
			})
		}
	}
	return userproducts
}