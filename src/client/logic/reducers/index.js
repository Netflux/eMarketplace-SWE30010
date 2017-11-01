import categoriesReducer from './categories'
import productsReducer from './products'
import usersReducer from './users'
import basketsReducer from './basket'

const rootReducer = (state, action) => ({
	categories: categoriesReducer(state.categories, action),
	products: productsReducer(state.products, action),
	users: usersReducer(state.users, action),
	basket: basketsReducer(state.basket, action)
})

export default rootReducer
