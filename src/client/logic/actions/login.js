export const FETCH_LOGIN = 'FETCH_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR'

export const fetchLogin = ($store, $http) => {
	const isFetching = $store.getState().login

	if (!state.isFetching) {
		$store.update({
			type: FETCH_LOGIN
		})
		$http.get('/api/users/:id')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_LOGIN,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_LOGIN_ERROR
				})
			})
	}
}