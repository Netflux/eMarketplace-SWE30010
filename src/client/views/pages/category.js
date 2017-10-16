import './css/CategoryPage.css'
import { fetchCategories } from 'client/logic/actions/categories'

const category = {
	templateUrl: 'templates/pages/CategoryPage.html',
    controller:['$store','$stateParams','$http', function($store, $stateParams, $http){
        this.$onDestroy = $store.subscribe(state => this.categories = state.categories)
		fetchCategories($store, $http)

        // Populate breadcrumbs
        this.crumbs = [{
            title:'Category',
            url: 'category'
        }]
    }]
}

export default category
