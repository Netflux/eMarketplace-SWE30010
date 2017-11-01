import { fetchProducts, userProducts } from 'client/logic/actions/products'

const sellerproducts = {
	templateUrl: 'templates/components/SellerProducts.html',
	controller:['$store','$http','$window', function($store, $http, $window){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			//Temporary check userId
			var userId = 2
			this.userproducts = []
            this.userproducts = userProducts(this.products, userId)            
        })
         
        this.deleteProductItem = function(productKey){
            $http({ withCredentials: true, method: 'delete', url:`/api/products/${productKey}`})
                .then(function sucessCallback(response){
                    alert("Item removed")
                    fetchProducts($store, $http)
                }, function errorCallback(response){
                    alert("Database is currently down. Try again later") 
                })
        }
        
		fetchProducts($store,$http)
	}]
}

export default sellerproducts