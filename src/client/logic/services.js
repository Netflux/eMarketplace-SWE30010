import reducer from './reducers'

export function $store() {
	let state = {}
	let subscribers = []
	const rootReducer = reducer

	this.getState = () => ({ ...state })
	this.update = action => {
		state = rootReducer(state, action)
		for (const func of subscribers) func(state)
	}
	this.subscribe = func => {
		subscribers.push(func)
		func(state)
		return () => this.unsubscribe(func)
	}
	this.unsubscribe = func => {
		subscribers = subscribers.filter(i => i === func)
	}
	this.update({ type: '$STORE_NULL' })
}
