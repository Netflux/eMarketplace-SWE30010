import { fetchProducts, userProducts } from 'client/logic/actions/products'
import { fetchUsers } from 'client/logic/actions/users'

const sellerproducts = {
	templateUrl: 'templates/components/SellerProducts.html',
	controller:['$store', '$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
            this.users = state.users
            this.account = state.account
            this.user = this.users.items.find(i => i.username === this.account.data.username)
			this.userproducts = []
            if(this.user) { 
                this.userproducts = userProducts(this.products, this.user.userId)
            }
		})
        
		this.deleteProductItem = function(productKey){
			$http({ withCredentials: true, method: 'delete', url:`/api/products/${productKey}`})
				.then(function sucessCallback() {
					alert('Item removed.')
					fetchProducts($store, $http)
				}, function errorCallback() {
					alert('Database is currently down. Try again later.')
				})
		}

		fetchProducts($store, $http)
        fetchUsers($store, $http)
	}]
}

export default sellerproducts
