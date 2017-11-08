import * as actions from 'client/logic/actions/account'

const accountReducer = (state = {
	isLoggedIn: false,
	isFetching: false,
	data: {}
}, action) => {
	switch (action.type) {
	case actions.FETCH_ACCOUNT:
		return {
			...state,
			isFetching: true,
		}
	case actions.RECEIVE_ACCOUNT:
		return {
			...state,
			isLoggedIn: action.isLoggedIn,
			isFetching: false,
			data: action.data
		}
	case actions.RECEIVE_ACCOUNT_ERROR:
		return {
			...state,
			isFetching: false
		}
    case actions.RECEIVE_ACCOUNT_ADDRESS:
        return {
            ...state,
            data: {
                ...state.data,
                address: action.address
            }
        }
	default:
		return state
	}
}

export default accountReducer
