import './css/ProductPage.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'
import { fetchUsers } from 'client/logic/actions/users'

const product = {
	templateUrl: 'templates/pages/ProductPage.html',
    controller:['$store','$stateParams','$http','$location', function($store, $stateParams, $http, $location){
        this.$onDestroy = $store.subscribe(state => {
            this.products = state.products
            this.categories = state.categories
            this.users = state.users

            // Check local cache
            this.product = this.products.items.find(i => i.productKey === $stateParams.productKey)
            this.category = this.product ? this.categories.items.find(i => i.categoryId === this.product.categoryId) : undefined
            this.user = this.product ? this.users.items.find(i => i.userId === this.product.userId) : undefined
 
            // Populate breadcrumbs
            this.crumbs = [{
                title:'Category',
                url: 'category'
            }, {
                title: this.category ? this.category.title : 'Category Title',
                url: this.category ? `products({ categoryId: ${this.category.categoryId} })` : ''
            }, {
                title: this.product ? this.product.title : 'Product Title',
                url: this.product ? `product({ productKey: '${this.product.productKey}' })` : ''
            }]
            
            // Generating random product
            this.productRandomization = []
            var i = 0
            function search(nameKey, myArray){
                for (var i=0; i < myArray.length; i++) {
                    if (myArray[i].productId === nameKey) {
                        return myArray[i]
                    }
                }
            }
            
            // Will become infinite loop if i++ is in if statement
            while(i < 4){
                var generatenumber = Math.floor((Math.random() * state.products.items.length) + 1)
                var resultObject = search(generatenumber, state.products.items)
                if(search(generatenumber,this.productRandomization) != resultObject){
                    this.productRandomization.push(resultObject)
                }
                i++
            }
            
            
            
            
            //Handle form submission 
            this.addBasket = function () {
                this.basket = {
                    productKey: this.product.productKey,
                    quantity: this.productqty
                }
                console.log(this.product.productKey)
                console.log(this.productqty)
                console.log(this.basket)
                console.log(this.basket.length)
                if (this.basket.length == undefined ){
                    this.testing = "Empty"
                }
                
                for (var i = 0; i < this.basket.length; i++){
                    if (this.basket[i].productKey == this.product.productKey){
                        this.testing = "Yeap its inside"
                    }else {
                        this.testing = "Nope not included"
                        /*$http({ withCredentials: true,
                            method: 'post',
                            url:'/api/basket',
                            data: this.basket })
                        .then(function sucessCall1back(response){
                            alert("Successfully added to basket")
                            $location.path("/basket")
                        }, function errorCallback(response){
                            alert("Database is currently down. Try again later") 
                        })*/
                    }    
                }
            }            
        })
        
        // In cache not found, fetch from server
		fetchCategories($store, $http)
        fetchProducts($store, $http)
        fetchUsers($store, $http)
    }]
}


export default product
