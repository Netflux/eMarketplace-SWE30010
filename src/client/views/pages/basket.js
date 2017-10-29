import './css/BasketPage.css'

import { fetchBaskets } from 'client/logic/actions/baskets'
import { fetchProducts } from 'client/logic/actions/products'

const basket = {
	templateUrl: 'templates/pages/BasketPage.html',
    controller:['$store','$http','$window', function($store, $http, $window){
		this.$onDestroy = $store.subscribe(state => {
            this.baskets = state.baskets
            this.products = state.products
            this.basketitems = [];
            this.totalprice = 0;
            
            
            for (var j = 0; j < this.baskets.items.length; j++){ 
                for (var i = 0; i < this.products.items.length; i++){
                     if (this.products.items[i].productKey == this.baskets.items[j].productKey){
                        this.basketitems.push({
                            productKey: this.products.items[i].productKey,
                            title: this.products.items[i].title,
                            images: this.products.items[i].images[0].imageUrl,
                            shipping: this.products.items[i].shippingPrice,
                            price: this.products.items[i].price,
                            sumprice: this.products.items[i].price * this.baskets.items[j].quantity,
                            quantity: this.baskets.items[j].quantity
                        })
                        this.totalprice += this.basketitems[j].sumprice + this.basketitems[j].shipping; 
                         
                    }    
                } 
            }
            
            this.deleteItem = function(productKey) {
                $http({ withCredentials: true, method: 'delete', url:`/api/basket/${productKey}`})
                    .then(function sucessCall1back(response){
                        alert("Item removed")
                        $window.location.reload()
                    }, function errorCallback(response){
                        alert("Database is currently down. Try again later") 
                    })
            }
        })
        
        fetchBaskets($store,$http)
        fetchProducts($store,$http)
    }]
}

export default basket