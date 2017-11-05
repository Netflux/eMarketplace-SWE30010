import './css/CheckoutPage.css'

import { fetchBasket, findBasketDetails, calculateTotalPrice } from 'client/logic/actions/basket'
import { fetchProducts } from 'client/logic/actions/products'

const checkout = {
	templateUrl: 'templates/pages/CheckoutPage.html',
	controller:['$store','$http', function ($store, $http){
		this.$onDestory = $store.subscribe(state => {
			this.basket = state.basket
			this.products = state.products
			this.checkoutitems = []
			this.totalprice

			this.checkoutitems = findBasketDetails(this.basket,this.products)
			this.totalprice = calculateTotalPrice(this.basket,this.products,this.checkoutitems)
		})

		this.checkout = function () {
			$http({ withCredentials: true, method: 'post', url:'/api/orders'})
				.then(function sucessCallback() {
					alert('Order sent to seller')
					fetchBasket($store,$http)
				}, function errorCallback() {
					alert('Database is currently down. Try again later')
				})
		}

		fetchBasket($store,$http)
		fetchProducts($store,$http)
	}]
}

export default checkout
