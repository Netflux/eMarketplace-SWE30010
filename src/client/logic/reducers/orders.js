import * as actions from 'client/logic/actions/orders'

const ordersReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
	case actions.FETCH_ORDERS:
		return {
			...state,
			isFetching: true
		}
	case actions.RECEIVE_ORDERS: {
		const items = state.items.filter(i => action.data.filter(j => i.ordersId === j.ordersId).length === 0)
		return {
			...state,
			lastFetched: Date.now(),
			isFetching: false,
			items: [...items, ...action.data]
		}
	}
	case actions.RECEIVE_ORDERS_ERROR:
		return {
			...state,
			isFetching: false
		}
	case actions.REMOVE_ORDERS:
		return {
			...state,
			items: state.items.filter(i => i.ordersId !== action.data)
		}
	default:
		return state
	}
}

export default ordersReducer
