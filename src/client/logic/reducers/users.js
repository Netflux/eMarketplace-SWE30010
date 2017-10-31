import * as actions from 'client/logic/actions/users'

const usersReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
	case actions.FETCH_USERS:
		return {
			...state,
			isFetching: true
		}
	case actions.RECEIVE_USERS: {
		const items = state.items.filter(i => action.data.filter(j => i.userId === j.userId).length === 0)
		return {
			...state,
			lastFetched: Date.now(),
			isFetching: false,
			items: [...items, ...action.data]

		}
	}
	case actions.RECEIVE_USERS_ERROR:
		return {
			...state,
			isFetching: false
		}
	default:
		return state
	}
}

export default usersReducer
