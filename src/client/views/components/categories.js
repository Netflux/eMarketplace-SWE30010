import { fetchCategories } from 'client/logic/actions/categories'

const categories = {
	templateUrl: 'templates/components/Categories.html',
    controller: ['$http', '$store', function($http, $store) {
        this.$onDestroy = $store.subscribe(state => this.categories = state.categories)
		fetchCategories($store, $http)
    }]
}

export default categories
