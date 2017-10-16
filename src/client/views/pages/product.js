import './css/ProductPage.css'

import { FETCH_CATEGORIES, RECEIVE_CATEGORIES, FETCH_CATEGORIES_ERROR } from 'client/logic/actions/categories'
import { FETCH_PRODUCTS, RECEIVE_PRODUCTS , FETCH_PRODUCTS_ERROR } from 'client/logic/actions/products'

const product = {
	templateUrl: 'templates/pages/ProductPage.html',
    controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
        this.$onDestroy = $store.subscribe(state => {
            this.products = state.products
            this.categories = state.categories
            
            // Check local cache
            this.product = this.products.items.find(i => i.productKey === $stateParams.productKey)
            this.category = this.categories.items.find(i => i.categoryId === parseInt($stateParams.categoryId))
            
            // Populate breadcrumbs
            this.crumbs = [{
                title:'Category',
                url: 'category'
            },{
                title: this.category ? this.category.title : 'Category Title',
                url: 'category'
            }]
        })
        
        // Victor: Will put these into separate function files, to be called when needed in different controllers.
        // In cache not found, fetch from server
        if (!this.product && !this.products.isFetching) {
            $store.update({
                type: FETCH_PRODUCTS
            })
            $http.get("/api/products")
                .then(function(response){
                        $store.update({
                            type: RECEIVE_PRODUCTS,
                            data: response.data.data
                        })
                    },
                    function(response){
                        $store.update({
                            //Error message when not found
                            type: RECEIVE_PRODUCTS_ERROR
                        })
                    }
                )
        }

        if (!this.category && !this.categories.isFetching){
            $store.update({
                type: FETCH_CATEGORIES
            })
            $http.get("/api/categories")
                .then(function(response){
                        $store.update({
                            type: RECEIVE_CATEGORIES,
                            data: response.data.data
                        })
                    },
                    function(response){
                        $store.update({
                            //Error message when not found
                            type: RECEIVE_CATEGORIES_ERROR
                        })
                    }
                )
        }

        //Fetch seller information
    }]
}


export default product