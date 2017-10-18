import categoriesReducer from './categories'
import productsReducer from './products'
import usersReducer from './users'

const rootReducer = (state, action) => ({
	categories: categoriesReducer(state.categories, action),
	products: productsReducer(state.products, action),
    users: usersReducer(state.users, action)
})

export default rootReducer
