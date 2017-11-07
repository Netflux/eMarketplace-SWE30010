import * as actions from 'client/logic/actions/login'

const loginReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
	case actions.FETCH_LOGIN:
		return {
			...state,
			isFetching: true
		}
	case actions.RECEIVE_LOGIN: {
		const items = state.items.filter(i => action.data.filter(j => i.userId === j.userId).length === 0)
		return {
			...state,
			lastFetched: Date.now(),
			isFetching: false,
			items: [...items, ...action.data]

		}
	}
	case actions.RECEIVE_LOGIN_ERROR:
		return {
			...state,
			isFetching: false
		}
	default:
		return state
	}
}

export default loginReducer
