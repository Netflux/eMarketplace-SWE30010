export const FETCH_ORDERS = 'FETCH_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const RECEIVE_ORDERS_ERROR = 'RECEIVE_ORDERS_ERROR'
export const REMOVE_ORDERS = 'REMOVE_ORDERS'

export const fetchOrders = ($store, $http) => {
	const isFetching = $store.getState().orders.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_ORDERS
		})
		$http.get('/api/orders')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_ORDERS,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_ORDERS_ERROR
				})
			})
	}
}
