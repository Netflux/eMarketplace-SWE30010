import categoriesReducer from './categories'
import productsReducer from './products'
import usersReducer from './users'
import basketsReducer from './basket'
import ordersReducer from './orders'
import loginReducer from './login'

const rootReducer = (state, action) => ({
	categories: categoriesReducer(state.categories, action),
	products: productsReducer(state.products, action),
	users: usersReducer(state.users, action),
	basket: basketsReducer(state.basket, action),
	orders: ordersReducer(state.orders, action),
	login: loginReducer(state.login, action)
})

export default rootReducer