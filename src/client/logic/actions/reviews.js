export const FETCH_REVIEWS = 'FETCH_REVIEWS'
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
export const RECEIVE_REVIEWS_ERROR = 'RECEIVE_REVIEWS_ERROR'
export const REMOVE_REVIEWS = 'REMOVE_REVIEWS'

export const fetchReviews = ($store, $http, productKey) => {
	const isFetching = $store.getState().reviews.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_REVIEWS
		})
		$http.get(`/api/products/${productKey}/reviews`)
			.then(function success(response) {
				$store.update({
					type: RECEIVE_REVIEWS,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_REVIEWS_ERROR
				})
			})
	}
}
