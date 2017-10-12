import { $store } from './logic/services'
import * as pages from './views/pages'
import * as components from './views/components'
import routes from './views/routes'

import './index.css'

(angular => {
	'use strict'

	angular.module('app.services', [])
		.service('$store', $store)

	angular.module('app.components', ['app.services'])
		.component('adminPage', pages.admin)
		.component('basketPage', pages.basket)
		.component('categoryPage', pages.category)
		.component('checkoutPage', pages.checkout)
		.component('customerPage', pages.customer)
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

	angular.module('app', ['app.services', 'app.routes'])
})(window.angular)
