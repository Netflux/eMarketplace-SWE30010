import './css/SellerAddProducts.css'

import { fetchCategories } from 'client/logic/actions/categories'
import { fetchProducts } from 'client/logic/actions/products'

const selleraddproducts = {
	templateUrl: 'templates/components/SellerAddProducts.html',
	controller:['$store','$http','$window', function($store, $http, $window){
		this.$onDestroy = $store.subscribe(state => {
            this.categories = state.categories    
        })
        
        this.addform = false
        
        this.showproduct = function() {
            this.addform = true
        }
        
        this.addProduct = () => {
            const formData = new FormData(document.forms.namedItem('addProduct'))
            $http.post("/api/products", formData, { headers: { 'Content-Type': undefined } })
            .then(function success(response){
                alert("Successfully add this product.")
                fetchProducts($store, $http)
            }, function failure(response){
                alert("Fail to add this product.")
            })
        }
        
        fetchCategories($store, $http)
	}]
}

export default selleraddproducts