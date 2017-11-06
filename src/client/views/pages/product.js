import './css/ProductPage.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'
import { fetchUsers } from 'client/logic/actions/users'
import { fetchBasket } from 'client/logic/actions/basket'
import { fetchReviews } from 'client/logic/actions/reviews'

const product = {
	templateUrl: 'templates/pages/ProductPage.html',
	controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			this.categories = state.categories
			this.users = state.users
            this.reviews = state.reviews
            
			// Check local cache
			this.product = this.products.items.find(i => i.productKey === $stateParams.productKey)
			this.category = this.product ? this.categories.items.find(i => i.categoryId === this.product.categoryId) : undefined
			this.user = this.product ? this.users.items.find(i => i.userId === this.product.userId) : undefined
            this.review = this.product ? this.reviews.items.find(i => i.productKey === this.product.productKey) : undefined
            
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

			// Generating random product
			this.productRandomization = []
			var i = 0
			function search(nameKey, myArray){
				for (var i=0; i < myArray.length; i++) {
					if (myArray[i].productId === nameKey) {
						return myArray[i]
					}
				}
			}

			while(i < 4){
				var generatenumber = Math.floor((Math.random() * state.products.items.length) + 1)
				var resultObject = search(generatenumber, state.products.items)
				if(search(generatenumber,this.productRandomization) != resultObject){
					this.productRandomization.push(resultObject)
				}
				i++
			}
            
			this.addBasket = function () {
				if (this.productqty <= this.product.stock){
					this.basket = {
						productKey: this.product.productKey,
						quantity: this.productqty
					}

					$http({ withCredentials: true, method: 'post', url:'/api/basket', data: this.basket })
						.then(function sucessCallback(){
							alert('Successfully added to basket')
							fetchBasket($store,$http)
						}, function errorCallback(){
							alert('You must be logged in to buy a product.')
						})
				}
				else {
					alert ('Not enough stock available for purchase')
				}
			}
            
            this.addReview = function() {  
                this.review = {
                    userId: 2,
                    productKey: this.product.productKey,
                    title: this.title,
                    rating: this.rating,
                    description: this.description
                }
                
                $http({ withCredentials: true, method: 'post', url:`/api/products/${this.product.productKey}/reviews`, data: this.review })
						.then(function sucessCallback(){
							alert('Successfully added review')
						}, function errorCallback(){
							alert('You must be logged to post review.')
						})
            }
		})

		// In cache not found, fetch from server
		fetchCategories($store, $http)
		fetchProducts($store, $http)
		fetchUsers($store, $http)
		fetchBasket($store,$http)
        fetchReviews($store, $http)
	}]
}

export default product
