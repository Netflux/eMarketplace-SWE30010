import './css/SellerAddProducts.css'
import './css/SellerUpdateProducts.css'

import { fetchProducts, userProducts } from 'client/logic/actions/products'
import { fetchCategories } from 'client/logic/actions/categories'

const sellerupdateproducts = {
	templateUrl: 'templates/components/SellerUpdateProducts.html',
	controller:['$store', '$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			this.categories = state.categories
			this.userproducts = userProducts(this.products, userId)
		})

		this.updateform = false
		var userId = 2

		this.showproduct = function(productKey) {
			this.updateform = true
			this.userproduct = this.products.items.find(i => i.productKey === productKey)
		}

		this.updateProduct = function () {
			console.log(this.userproduct)
			$http.post(`/api/products/${this.userproduct.productKey}`, this.userproduct)
				.then(function sucessCallback(){
					alert('Successfully updated your product')
					fetchProducts($store, $http)
				}, function errorCallback(response){
					alert('Database is currently down. Try again later')
					console.log(response)
				})
		}

		fetchProducts($store, $http)
		fetchCategories($store, $http)
	}]
}

export default sellerupdateproducts
