import { fetchCategories } from 'client/logic/actions/categories'

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
        })
        fetchCategories($store, $http)
    }]
}

export default listcategories
