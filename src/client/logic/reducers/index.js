import categoriesReducer from './categories'
import productsReducer from './products'
import usersReducer from './users'
import basketsReducer from './baskets'

const rootReducer = (state, action) => ({
	categories: categoriesReducer(state.categories, action),
	products: productsReducer(state.products, action),
    users: usersReducer(state.users, action),
    baskets: basketsReducer(state.baskets, action)
})

export default rootReducer
