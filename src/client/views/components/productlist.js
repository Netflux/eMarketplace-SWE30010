import { fetchProducts } from 'client/logic/actions/products'

const productlist = {
	require: { parentComp: '^productsListPage' },
	templateUrl: 'templates/components/ProductList.html',
	bindings: {
		$stateParams: '='
	},
	controller:['$http', '$store', function($http, $store) {
		this.$onInit = () => {
			this.$onDestroy = $store.subscribe(state => {
				this.categories = state.categories
				this.products = {
					...state.products,
					items: state.products.items.filter(i => i.categoryId === parseInt(this.parentComp.$stateParams.categoryId))
				}
				
				//filter of name
				this.orderByName = function(field){
					this.myName = field;
				}
				
				//get reviews
				if(this.products.items.length === 2){
					var productid1 = this.products.items[0].productId
					var productid2 = this.products.items[1].productId
				}
			})

			//Error Handling here
			// 1. Check local cache
			// 2. if not found, try to fetch from server
			// 3. If still not found, show error
			fetchProducts($store, $http, this.parentComp.$stateParams.categoryId)
		}
	}]
}

export default productlist
