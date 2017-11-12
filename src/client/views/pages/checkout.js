import './css/CheckoutPage.css'

import { RECEIVE_ACCOUNT_ADDRESS } from 'client/logic/actions/account'
import { fetchBasket, findBasketDetails, calculateTotalPrice, CLEAR_BASKET } from 'client/logic/actions/basket'
import { fetchProducts } from 'client/logic/actions/products'

const checkout = {
	templateUrl: 'templates/pages/CheckoutPage.html',
	controller:['$store','$http', function ($store, $http){
        const ctrl = this
		ctrl.$onDestory = $store.subscribe(state => {
			ctrl.basket = state.basket
			ctrl.products = state.products
            ctrl.account = state.account.data
            
			ctrl.checkoutitems = []
			ctrl.totalprice

			ctrl.checkoutitems = findBasketDetails(ctrl.basket,ctrl.products)
			ctrl.totalprice = calculateTotalPrice(ctrl.basket,ctrl.products,ctrl.checkoutitems)
		})
		ctrl.checkout = function () {
            console.log(ctrl.account.address)
			$http.post('/api/users/address', ctrl.account.address, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
                .then(function successCallback() {
                    $store.update({
                        type: RECEIVE_ACCOUNT_ADDRESS,
                        address: ctrl.account.address
                    })
                })
			$http({ withCredentials: true, method: 'post', url:'/api/orders'})
				.then(function sucessCallback() {
                    $store.update({ type: CLEAR_BASKET })
					alert('Order sent to seller.')
				}, function errorCallback() {
					alert('Unable to checkout.')
				})
		}

		fetchBasket($store,$http)
		fetchProducts($store,$http)
	}]
}

export default checkout
