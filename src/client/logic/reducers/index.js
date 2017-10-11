import categoriesReducer from './categories'
import productsReducer from './products'

const rootReducer = (state, action) => ({
	categories: categoriesReducer(state.categories, action),
	products: productsReducer(state.products, action)
})

export default rootReducer
