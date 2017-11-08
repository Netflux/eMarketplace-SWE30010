export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'
export const RECEIVE_ACCOUNT_ERROR = 'RECEIVE_ACCOUNT_ERROR'
export const RECEIVE_ACCOUNT_ADDRESS = 'RECEIVE_ACCOUNT_ADDRESS'

export const fetchAccount = ($store, $http) => {
	const isFetching = $store.getState().account.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_ACCOUNT
		})
		$http.get('/api/users/login')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_ACCOUNT,
					isLoggedIn: true,
					data: response.data.data
				})
			}, function failure(response) {
				if (response.status === 403) {
					$store.update({
						type: RECEIVE_ACCOUNT,
						isLoggedIn: false
					})
				} else {
					$store.update({
						type: RECEIVE_ACCOUNT_ERROR
					})
				}
			})
	}
}

export const fetchLogin = ($store, $http, data) => {
	const isFetching = $store.getState().account.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_ACCOUNT
		})
		$http({
			withCredentials: true,
			method:'post',
			url:'api/users/login',
			data,
			headers: {'Content-Type': 'application/json'}
		}).then(function successCallback(response) {
			$store.update({
				type: RECEIVE_ACCOUNT,
				isLoggedIn: true,
				data: response.data.data
			})
			alert('Login Success')
		}, function errorCallback(response) {
			if (response.status === 403) {
				$store.update({
					type: RECEIVE_ACCOUNT,
					isLoggedIn: false
				})
			} else {
				$store.update({
					type: RECEIVE_ACCOUNT_ERROR
				})
			}
			alert('Can\'t do that right now. Try again later')
		})
	}
}

export const fetchLogout = ($store, $http) => {
	const isFetching = $store.getState().account.isFetching

	if (!isFetching) {
		$http({
			withCredentials: true,
			method:'post',
			url:'api/users/logout'
		}).then(function successCallback() {
			$store.update({
				type: RECEIVE_ACCOUNT,
				isLoggedIn: false
			})
			alert('Logout Success')
		}, function errorCallback() {
			alert('Can\'t logout right now. Try again later')
		})
	}
}
