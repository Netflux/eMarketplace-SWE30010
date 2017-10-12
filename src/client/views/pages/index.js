import './css/AdminPage.css'
import './css/BasketPage.css'
import './css/CategoryPage.css'
import './css/CheckoutPage.css'
import './css/HomePage.css'
import './css/LoginPage.css'
import './css/ProductPage.css'
import './css/SignupPage.css'

export const admin = {
	templateUrl: 'templates/pages/AdminPage.html'
}

export const basket = {
	templateUrl: 'templates/pages/BasketPage.html'
}

export const category = {
	templateUrl: 'templates/pages/CategoryPage.html'
}

export const checkout = {
	templateUrl: 'templates/pages/CheckoutPage.html'
}

export const home = {
	templateUrl: 'templates/pages/HomePage.html'
}

export const login = {
	templateUrl: 'templates/pages/LoginPage.html'
}

export const product = {
	templateUrl: 'templates/pages/ProductPage.html',
    controller:['$store','$stateParams', function($store,$stateParams){
        this.$onDestroy = $store.subscribe(state => this.products = state.products)
        //Error Handling here 
        // 1. Check local cache
        // 2. if not found, try to fetch from server
        // 3. If still not found, show error
        
        // 1
        this.product = this.products.items.find(i => i.productKey === $stateParams.productKey)
        
        if (!this.product) {
            // 2
        }
        
        //Fetch seller information
        
        
    }]
}

export const productslist = {
	templateUrl: 'templates/pages/ProductsListPage.html',
    controller:['$store','$stateParams', function($store,$stateParams){
        this.$onDestroy = $store.subscribe(state => this.categories = state.categories)
        //Error Handling here 
        // 1. Check local cache
        // 2. if not found, try to fetch from server
        // 3. If still not found, show error
        
        // 1
        this.productslist = this.categories.items.find(i => i.categoryId === $stateParams.categoryId)
        
        if (!this.productslist) {
            // 2
        }
        
    }]
}

export const signup = {
	templateUrl: 'templates/pages/SignupPage.html'
}
