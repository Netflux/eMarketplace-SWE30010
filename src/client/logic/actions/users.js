export const FETCH_USERS = 'FETCH_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'

export const fetchUsers = ($store, $http) => {
	const isFetching = $store.getState().users.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_USERS
		})
		$http.get("/api/users")
			.then(function success(response) {
				$store.update({
					type: RECEIVE_USERS,
					data: response.data.data
				})
			}, function failure(response) {
				$store.update({
					type: RECEIVE_USERS_ERROR
				})
			})
	}
}
