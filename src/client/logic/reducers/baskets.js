import * as actions from 'client/logic/actions/baskets'

const basketsReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
	case actions.FETCH_BASKETS:
		return {
			...state,
			isFetching: true
		}
	case actions.RECEIVE_BASKETS: {
		const items = state.items.filter(i => action.data.filter(j => i.productKey === j.productKey).length === 0)
		return {
			...state,
			lastFetched: Date.now(),
			isFetching: false,
			items: [...items, ...action.data]
		}
	}
	case actions.RECEIVE_BASKETS_ERROR:
		return {
			...state,
			isFetching: false
		}
	default:
		return state
	}
}

export default basketsReducer
