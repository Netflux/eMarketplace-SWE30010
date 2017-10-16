import { FETCH_CATEGORIES, RECEIVE_CATEGORIES, FETCH_CATEGORIES_ERROR } from 'client/logic/actions/categories'

const listcategories = {
	templateUrl: 'templates/components/ListCategories.html',
    controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
        this.$onDestroy = $store.subscribe(state => {
            this.categories = state.categories
            this.categoryList = []
            
            const categoryName = {}
            for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
                categoryName[letter] = []
            }
            
            state.categories.items.forEach((item) => {
                categoryName[item.title.charAt(0)].push(item)
            })
            
            for (const letter in categoryName) {
                if (categoryName[letter].length > 0) {
                    this.categoryList.push({
                        letter,
                        items: categoryName[letter]
                    })
                }
            }
            console.log(this.categoryList)
        })
        
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

export default listcategories
