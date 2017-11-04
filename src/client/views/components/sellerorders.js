import { fetchOrders } from 'client/logic/actions/orders'

const sellerorders = {
	templateUrl: 'templates/components/SellerOrders.html',
	controller:['$http', '$store', function($http, $store) {
        this.$onDestroy = $store.subscribe(state => this.orders = state.orders)
        
        this.checker = false
        
        this.showDetails = function(orderId) {
            this.orderDetailsId = orderId
            this.checker = true
        }
        this.backToOrders = function() {
            this.checker = false
        }
    
		fetchOrders($store, $http)
	}]
}

export default sellerorders
