import * as actions from 'client/logic/actions/login'

const loginReducer = (state = {}, action) => {
	switch (action.type) {
	case actions.RECEIVE_LOGIN: {
		return {
			...state,
			user: action.data
		}
	}
	default:
		return state
	}
}

export default loginReducer
