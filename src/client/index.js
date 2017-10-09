import * as pages from './views/pages'
import * as components from './views/components'
import routes from './views/routes'

import './index.css'

(angular => {
	'use strict'

	angular.module('app.components', [])
		.component('adminPage', pages.admin)
		.component('basketPage', pages.basket)
		.component('categoryPage', pages.category)
		.component('checkoutPage', pages.checkout)
		.component('homePage', pages.home)
		.component('loginPage', pages.login)
		.component('productPage', pages.product)
		.component('productsListPage', pages.productslist)
		.component('signupPage', pages.signup)
		.component('navbar', components.navbar)
		.component('footersection', components.footersection)

	angular.module('app.routes', ['ui.router', 'app.components'])
		.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
			routes.forEach(route => $stateProvider.state(route))
			$urlRouterProvider.otherwise('/')
		}])

	angular.module('app', ['app.routes'])
})(window.angular)
