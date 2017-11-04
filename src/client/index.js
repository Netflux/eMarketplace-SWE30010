import { $store } from './logic/services'
import * as pages from './views/pages'
import * as components from './views/components'
import routes from './views/routes'

import './index.css'

(angular => {
	'use strict'

	angular.module('app.services', [])
		.service('$store', $store)

	angular.module('app.components', ['app.services', 'chart.js'])
		.component('accountPage', pages.account)
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
		.component('bannertools', components.bannertools)
		.component('breadcrumbs', components.breadcrumbs)
		.component('categories', components.categories)
		.component('categorytools', components.categorytools)
		.component('listcategories', components.listcategories)
		.component('productlist', components.productlist)
		.component('salesanalysis', components.salesanalysis)
		.component('sellerproducts', components.sellerproducts)
		.component('selleraddproducts', components.selleraddproducts)
		.component('sellerupdateproducts', components.sellerupdateproducts)

	angular.module('app.routes', ['ui.router', 'app.components'])
		.config(['$stateProvider', '$urlRouterProvider', '$transitionsProvider', ($stateProvider, $urlRouterProvider, $transitionsProvider) => {
			routes.forEach(route => $stateProvider.state(route))
			$urlRouterProvider.otherwise('/')
			$transitionsProvider.onSuccess({}, transition => {
				if (transition.from().name !== transition.to().name) {
					window.scrollTo(0, 0)
				}
			})
		}])
		
	angular.module('app', ['app.services', 'app.routes'])
		.directive('ngConfirmClick', [function() {
			return {
				link: function (scope, element, attr) {
					var msg = attr.ngConfirmClick || 'Are you sure?'
					var clickAction = attr.confirmedClick
					element.bind('click', function () {
						if ( window.confirm(msg) ) {
							scope.$eval(clickAction)
						}
					})
				}
			}
		}])

})(window.angular)
