import { fetchProducts, userProducts, DELETE_PRODUCTS } from 'client/logic/actions/products'

const sellerproducts = {
	templateUrl: 'templates/components/SellerProducts.html',
	controller:['$store', '$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
            this.account = state.account
            this.userproducts = this.account.isLoggedIn ? userProducts(this.products, this.account.data.userId) : []
		})
        
		this.deleteProductItem = function(productKey){
			$http({ withCredentials: true, method: 'delete', url:`/api/products/${productKey}`})
				.then(function sucessCallback() {
					alert('Item removed.')
                    $store.update ({
                        type: DELETE_PRODUCTS,
                        productKey
                    })
				}, function errorCallback() {
					alert('Database is currently down. Try again later.')
				})
		}
        
        fetchProducts($store, $http)
	}]
}

export default sellerproducts
