import * as actions from 'client/logic/actions/categories'

const categories = {
	templateUrl: 'templates/components/Categories.html',
    controller:['$http','$store', function($http,$store){
        this.$onDestroy = $store.subscribe(state => this.categories = state.categories)
        
        if (!this.categories.isFetching) {
            $store.update({
            type: actions.FETCH_CATEGORIES
        })
        $http.get("/api/categories")
            .then(function(response){
                    $store.update({
                        type: actions.RECEIVE_CATEGORIES,
                        data: response.data.data
                    })
                },
                function(response){
                    $store.update({
                        type: actions.RECEIVE_CATEGORIES_ERROR
                    })
                }
            )
        }   
    }] 
}

export default categories
