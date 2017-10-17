import './css/ProductPage.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'

const product = {
	templateUrl: 'templates/pages/ProductPage.html',
	controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			this.categories = state.categories

			// Check local cache
			this.product = this.products.items.find(i => i.productKey === $stateParams.productKey)
			this.category = this.product ? this.categories.items.find(i => i.categoryId === this.product.categoryId) : undefined

			// Populate breadcrumbs
			this.crumbs = [{
				title:'Category',
				url: 'category'
			}, {
				title: this.category ? this.category.title : 'Category Title',
				url: this.category ? `products({ categoryId: ${this.category.categoryId} })` : ''
			}, {
				title: this.product ? this.product.title : 'Product Title',
				url: this.product ? `product({ productKey: '${this.product.productKey}' })` : ''
			}]
		})

		// Victor: Will put these into separate function files, to be called when needed in different controllers.
		// In cache not found, fetch from server
		fetchCategories($store, $http)
		fetchProducts($store, $http)

		//Fetch seller information
	}]
}


export default product
