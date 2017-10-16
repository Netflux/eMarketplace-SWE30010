import { fetchCategories } from 'client/logic/actions/categories'

const productslist = {
	templateUrl: 'templates/pages/ProductsListPage.html',
    controller:['$http','$store','$stateParams', function($http, $store, $stateParams){
        this.$stateParams = $stateParams

        //Subscribe to cache
        this.$onDestroy = $store.subscribe(state => {
            this.categories = state.categories

            // Check local cache
            this.category = this.categories.items.find(i => i.categoryId === parseInt($stateParams.categoryId))

            // Populate breadcrumbs
            this.crumbs = [{
                title:'Category',
                url: 'category'
            },{
                title: this.category ? this.category.title : 'Category Title',
                url: this.category ? `products({ categoryId: ${this.category.categoryId} })` : ''
            }]
        })

        // Victor: Will put these into separate function files, to be called when needed in different controllers.
        // In cache not found, fetch from server
        fetchCategories($store, $http)
    }]
}

export default productslist
