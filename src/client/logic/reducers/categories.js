import * as actions from 'client/logic/actions/categories'

const categoriesReducer = (state = {
	lastFetched: 0,
	isFetching: false,
	items: []
}, action) => {
	switch (action.type) {
    case actions.FETCH_CATEGORIES:
        return {
            ...state,
            isFetching: true
        }
    case actions.RECEIVE_CATEGORIES:
        const items = state.items.filter(i => action.data.filter(j => i.categoryId === j.categoryId).length === 0)
        return {
            ...state,
            lastFetched: Date.now(),
            isFetching: false,
            items: [...items, ...action.data]
            
        }
    case actions.RECEIVE_CATEGORIES_ERROR:
        return {
            ...state,
            isFetching: false
        }
	default:
		return state
	}
}

export default categoriesReducer
