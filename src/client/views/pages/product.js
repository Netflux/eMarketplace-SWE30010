import './css/ProductPage.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'
import { fetchUsers } from 'client/logic/actions/users'
import { fetchBasket } from 'client/logic/actions/basket'

const product = {
	templateUrl: 'templates/pages/ProductPage.html',
	controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
        const ctrl = this
        ctrl.seeAddReview = false 
        
        ctrl.addBasket = function () {
            if (ctrl.productqty <= ctrl.product.stock){
                const basket = {
                    productKey: ctrl.product.productKey,
                    quantity: ctrl.productqty
                }

                $http({ withCredentials: true, method: 'post', url:'/api/basket', data: basket })
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

        ctrl.addReview = function() {  
            const review = {
                userId: 2,
                productKey: ctrl.product.productKey,
                title: ctrl.title,
                rating: ctrl.rating,
                description: ctrl.description
            }

            $http({ withCredentials: true, method: 'post', url:`/api/products/${ctrl.product.productKey}/reviews`, data: review })
                    .then(function sucessCallback(){
                        alert('Successfully added review')
                        ctrl.fetchReviews()
                    }, function errorCallback(){
                        alert('You must be logged to post review.')
                    })
        }

        ctrl.fetchReviews = function() {
            if (ctrl.product) {
                $http.get(`/api/products/${ctrl.product.productKey}/reviews`)
                    .then(function success(response) {
                        ctrl.reviews = response.data.data
                    }, function failure() {
                        ctrl.reviews = []
                    })
            }
        }
        
        ctrl.getStar = function(num) {
            return new Array(num);   
        }
        
        ctrl.enableReview = function (bool) {
            ctrl.seeAddReview = bool
        }
        
		ctrl.$onDestroy = $store.subscribe(state => {
			ctrl.products = state.products
			ctrl.categories = state.categories
			ctrl.users = state.users
            
			// Check local cache
			ctrl.product = ctrl.products.items.find(i => i.productKey === $stateParams.productKey)
			ctrl.category = ctrl.product ? ctrl.categories.items.find(i => i.categoryId === ctrl.product.categoryId) : undefined
			ctrl.user = ctrl.product ? ctrl.users.items.find(i => i.userId === ctrl.product.userId) : undefined
            
			// Populate breadcrumbs
			ctrl.crumbs = [{
				title:'Category',
				url: 'category'
			}, {
				title: ctrl.category ? ctrl.category.title : 'Category Title',
				url: ctrl.category ? `products({ categoryId: ${ctrl.category.categoryId} })` : ''
			}, {
				title: ctrl.product ? ctrl.product.title : 'Product Title',
				url: ctrl.product ? `product({ productKey: '${ctrl.product.productKey}' })` : ''
			}]

			// Generating random product
			ctrl.productRandomization = []
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
				if(search(generatenumber,ctrl.productRandomization) != resultObject){
					ctrl.productRandomization.push(resultObject)
				}
				i++
			}
            
            ctrl.fetchReviews()
		})
        
		// In cache not found, fetch from server
		fetchCategories($store, $http)
		fetchProducts($store, $http)
		fetchUsers($store, $http)
		fetchBasket($store,$http)
	}]
}

export default product
