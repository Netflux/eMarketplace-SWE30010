import './css/BasketPage.css'

import { fetchBasket, findBasketDetails, calculateTotalPrice, REMOVE_BASKET } from 'client/logic/actions/basket'
import { fetchProducts } from 'client/logic/actions/products'

const basket = {
	templateUrl: 'templates/pages/BasketPage.html',
	controller:['$store','$http', '$location', function($store, $http, $location){
		this.$onDestroy = $store.subscribe(state => {
			this.basket = state.basket
			this.products = state.products
			this.basketitems = []
			this.totalprice = 0

			this.basketitems = findBasketDetails(this.basket,this.products)
			this.totalprice = calculateTotalPrice(this.basket,this.products,this.basketitems)

			if (!state.account.isFetching && !state.account.isLoggedIn) {
				$location.path('/login')
			}
		})

		this.deleteBasketItem = function(productKey) {
			$http({ withCredentials: true, method: 'delete', url:`/api/basket/${productKey}` })
				.then(function sucessCallback() {
					$store.update({
                        type: REMOVE_BASKET,
                        productKey
                    })
				}, function errorCallback() {
					alert('Database is currently down. Try again later.')
				})
		}

		this.updateQuantity = function(productKey, quantity) {
			this.basketitem = this.products.items.find(i => i.productKey === productKey)

			if (quantity > this.basketitem.stock){
				alert(`This product has only ${quantity - 1} stock left.`)
			}else if (quantity == 0) {
				alert('Quantity must be at least 1.')
			}else {
				this.updateProduct = {
					productKey: productKey,
					quantity: quantity
				}

				$http({ withCredentials: true, method: 'post', url:`/api/basket/${productKey}`, data: this.updateProduct })
					.then(function sucessCallback() {
						alert('Item updated.')
						fetchBasket($store,$http)
					}, function errorCallback() {
						alert('Try again.')
					})
			}

		}

		fetchBasket($store,$http)
		fetchProducts($store,$http)
	}]
}

export default basket
