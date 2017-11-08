import './css/SellerAddProducts.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'

const selleraddproducts = {
	templateUrl: 'templates/components/SellerAddProducts.html',
	controller:['$store', '$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.categories = state.categories
		})

		this.addform = false

		this.showproduct = function() {
			this.addform = true
		}

		this.addProduct = () => {
			const formData = new FormData(document.forms.namedItem('addProduct'))
            for (const v of formData.values()) console.log(v)
			$http.post('/api/products', formData, { headers: { 'Content-Type': undefined } })
				.then(function success() {
					alert('Successfully add this product.')
					fetchProducts($store, $http)
				}, function failure(response) {
					alert('Fail to add this product.')
				})
		}

		fetchCategories($store, $http)
	}]
}

export default selleraddproducts
