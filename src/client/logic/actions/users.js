export const FETCH_USERS = 'FETCH_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'

export const fetchUsers = ($store, $http) => {
	const state = $store.getState().users

	if (!state.isFetching) {
		const timestamp = Date.now()
		$store.update({
			type: FETCH_USERS
		})
		$http.get(`/api/users?timestamp=${state.lastFetched}`)
			.then(function success(response) {
				$store.update({
					type: RECEIVE_USERS,
					data: response.data.data,
					timestamp
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_USERS_ERROR
				})
			})
	}
}
