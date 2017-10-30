import './css/BasketPage.css'

import { fetchBasket, findBasketDetails, calculateTotalPrice } from 'client/logic/actions/basket'
import { fetchProducts } from 'client/logic/actions/products'

const basket = {
	templateUrl: 'templates/pages/BasketPage.html',
    controller:['$store','$http','$window', function($store, $http, $window){
		this.$onDestroy = $store.subscribe(state => {
            this.basket = state.basket
            this.products = state.products
            this.basketitems = []
            this.totalprice = 0
            
            this.basketitems = findBasketDetails(this.basket,this.products)
            this.totalprice = calculateTotalPrice(this.basket,this.products,this.basketitems)
            
            this.deleteItem = function(productKey) {
                $http({ withCredentials: true, method: 'delete', url:`/api/basket/${productKey}`})
                    .then(function sucessCallback(response){
                        alert("Item removed")
                        $window.location.reload()
                    }, function errorCallback(response){
                        alert("Database is currently down. Try again later") 
                    })
            }
        })
        
        fetchBasket($store,$http)
        fetchProducts($store,$http)
    }]
}

export default basket