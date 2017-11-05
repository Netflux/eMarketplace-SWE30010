import './css/BasketPage.css'

import { fetchBasket, findBasketDetails, calculateTotalPrice } from 'client/logic/actions/basket'
import { fetchProducts } from 'client/logic/actions/products'

const basket = {
	templateUrl: 'templates/pages/BasketPage.html',
	controller:['$store','$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.basket = state.basket
			this.products = state.products
			this.basketitems = []
			this.totalprice = 0

			this.basketitems = findBasketDetails(this.basket,this.products)
			this.totalprice = calculateTotalPrice(this.basket,this.products,this.basketitems)
		})
        
		this.deleteBasketItem = function(productKey) {
			$http({ withCredentials: true, method: 'delete', url:`/api/basket/${productKey}` })
				.then(function sucessCallback() {
					alert('Item removed')
					fetchBasket($store,$http)
				}, function errorCallback() {
					alert('Database is currently down. Try again later')
				})
		}
            
		this.updateQuantity = function(productKey, quantity) {
			this.basketitem = this.products.items.find(i => i.productKey === productKey)

			if (quantity > this.basketitem.stock){
				alert(`This product has only ${quantity - 1} stock left.`)
			}else if (quantity == 0) {
				alert('Quantity must be at least 1')
			}else {
				this.updateProduct = {
					productKey: productKey,
					quantity: quantity
				}

				$http({ withCredentials: true, method: 'post', url:`/api/basket/${productKey}`, data: this.updateProduct })
					.then(function sucessCallback() {
						alert('Item updated')
						fetchBasket($store,$http)
					}, function errorCallback() {
						alert('Failed')
						fetchBasket($store,$http)
					}) 
			}

		}

		fetchBasket($store,$http)
		fetchProducts($store,$http)
	}]
}

export default basket
