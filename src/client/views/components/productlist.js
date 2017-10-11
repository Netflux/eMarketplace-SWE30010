import * as actions from 'client/logic/actions/products'

const productlist = {
	templateUrl: 'templates/components/ProductList.html',
    controller:['$http','$store', function($http,$store){
        this.$onDestroy = $store.subscribe(state => this.products = state.products)
        
        if (!this.products.isFetching) {
            $store.update({
            type: actions.FETCH_PRODUCTS
        })
        $http.get("/api/products")
            .then(function(response){
                    $store.update({
                        type: actions.RECEIVE_PRODUCTS,
                        data: response.data.data
                    })
                },
                function(response){
                    $store.update({
                        type: actions.RECEIVE_PRODUCTS_ERROR
                    })
                }
            )
        }   
    }] 
}

export default productlist
