import * as actions from 'client/logic/actions/reviews'

const reviewsReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
	case actions.FETCH_REVIEWS:
		return {
			...state,
			isFetching: true
		}
	case actions.RECEIVE_REVIEWS: {
		const items = state.items.filter(i => action.data.filter(j => i.productKey === j.productKey).length === 0)
		return {
			...state,
			lastFetched: Date.now(),
			isFetching: false,
			items: [...items, ...action.data]
		}
	}
	case actions.RECEIVE_REVIEWS_ERROR:
		return {
			...state,
			isFetching: false
		}
	case actions.REMOVE_REVIEWS:
		return {
			...state,
			items: state.items.filter(i => i.productKey !== action.data)
		}
	default:
		return state
	}
}

export default reviewsReducer
