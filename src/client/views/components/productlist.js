import * as actions from 'client/logic/actions/products'

const productlist = {
    require: { parentComp: '^productsListPage' },
	templateUrl: 'templates/components/ProductList.html',
    bindings: {
        $stateParams: '='
    },
    controller:['$http', '$store', function($http, $store){
        this.$onInit = () => {
            this.$onDestroy = $store.subscribe(state => {
                this.categories = state.categories
                this.products = {
                    ...state.products,
                    items: state.products.items.filter(i => i.categoryId === parseInt(this.parentComp.$stateParams.categoryId))
                }
            })
            
            //Error Handling here 
            // 1. Check local cache
            // 2. if not found, try to fetch from server
            // 3. If still not found, show error

            if (!this.products.isFetching) {
                $store.update({
                    type: actions.FETCH_PRODUCTS
                })
                $http.get(`/api/categories/${this.parentComp.$stateParams.categoryId}/products`)
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
                        })
            }
        }   
    }] 
}

export default productlist
