export const FETCH_BASKETS = 'FETCH_BASKETS'
export const RECEIVE_BASKETS = 'RECEIVE_BASKETS'
export const RECEIVE_BASKETS_ERROR = 'RECEIVE_BASKETS_ERROR'

export const fetchBaskets = ($store, $http) => {
	const isFetching = $store.getState().baskets.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_BASKETS
		})
		$http.get('/api/basket')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_BASKETS,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_BASKETS_ERROR
				})
			})
	}
}
