import { fetchOrders } from 'client/logic/actions/orders'

const sellerorders = {
	templateUrl: 'templates/components/SellerOrders.html',
	controller:['$http', '$store', function($http, $store) {
		this.$onDestroy = $store.subscribe(state => {
            this.orders = state.orders
        })
        
		this.checker = false
        
		this.showDetails = function(orderId,orderProducts) {
			this.orderDetailsId = orderId
			this.orderProducts = orderProducts     
			this.checker = true
            this.totalprice = 0
			for (var i = 0; i < orderProducts.length; i++){
				this.totalprice += orderProducts[i].price * orderProducts[i].quantity + orderProducts[i].shippingPrice
			}
		}
        
		this.backToOrders = function() {
			this.checker = false
		}
    
		fetchOrders($store, $http)
	}]
}

export default sellerorders
