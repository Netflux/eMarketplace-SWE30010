import './css/SellerAddProducts.css'
import './css/SellerUpdateProducts.css'

import { fetchProducts, userProducts } from 'client/logic/actions/products'
import { fetchCategories } from 'client/logic/actions/categories'
import { fetchUsers } from 'client/logic/actions/users'

const sellerupdateproducts = {
	templateUrl: 'templates/components/SellerUpdateProducts.html',
	controller:['$store', '$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			this.categories = state.categories
            this.users = state.users
            this.account = state.account
            this.user = this.users.items.find(i => i.username === this.account.data.username)
            if(this.user) { 
                this.userproducts = userProducts(this.products, this.user.userId)
            }
		})
		this.updateform = false

		this.showproduct = function(productKey) {
			this.updateform = true
			this.userproduct = this.products.items.find(i => i.productKey === productKey)
		}

		this.updateProduct = function () {
			$http.post(`/api/products/${this.userproduct.productKey}`, this.userproduct)
				.then(function sucessCallback() {
					alert('Successfully updated your product.')
					fetchProducts($store, $http)
				}, function errorCallback() {
					alert('Database is currently down. Try again later.')
				})
		}

		fetchProducts($store, $http)
		fetchCategories($store, $http)
        fetchUsers($store, $http)
	}]
}

export default sellerupdateproducts
