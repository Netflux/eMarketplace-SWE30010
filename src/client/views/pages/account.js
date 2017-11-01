import './css/AccountPage.css'

import { fetchProducts } from 'client/logic/actions/products'

const account = {
	templateUrl: 'templates/pages/AccountPage.html',
	controller:['$store','$http', function($store, $http){
		this.$onDestroy = $store.subscribe(state => {
			this.products = state.products
			//Temporary check userId
			var userid = 2
			this.userproducts = []

            for (var j = 0; j < this.products.items.length; j++){
                if(this.products.items[j].userId == userid){
                    this.userproducts.push({
                        productId: this.products.items[j].productId,
                        title: this.products.items[j].title,
                        stock: this.products.items[j].stock,
                        price: this.products.items[j].price,
                        shippingPrice: this.products.items[j].shippingPrice,
                        discount: this.products.items[j].discount,
                    })
                }
            }  
            
            this.deleteProductItem = function(productKey){
                $http({ withCredentials: true, method: 'delete', url:`/api/product/${productKey}`})
                    .then(function sucessCallback(response){
                        alert("Item removed")
                        $window.location.reload()
                    }, function errorCallback(response){
                        alert("Database is currently down. Try again later") 
                    })
            }
            
        })
         
		fetchProducts($store,$http)
	}]
}

export default account
