import './css/CategoryPage.css'
import { FETCH_CATEGORIES, RECEIVE_CATEGORIES, FETCH_CATEGORIES_ERROR } from 'client/logic/actions/categories'

const category = {
	templateUrl: 'templates/pages/CategoryPage.html',
    controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
        this.$onDestroy = $store.subscribe(state => this.categories = state.categories)
            
        // Populate breadcrumbs
        this.crumbs = [{
            title:'Category',
            url: 'category'
        }]
        
        if (!this.categories.isFetching) {
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
    }]
}

export default category