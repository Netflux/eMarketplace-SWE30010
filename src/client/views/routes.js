const routes = [
	{
		name: 'admin',
		url: '/admin',
		component: 'adminPage'
	},
	{
		name: 'basket',
		url: '/basket',
		component: 'basketPage'
	},
	{
		name: 'category',
		url: '/category',
		component: 'categoryPage'
	},
	{
		name: 'checkout',
		url: '/checkout',
		component: 'checkoutPage'
	},
	{
		name: 'home',
		url: '/',
		component: 'homePage'
	},
	{
		name: 'login',
		url: '/login',
		component: 'loginPage'
	},
	{
		name: 'product',
		url: '/product/:productKey',
		component: 'productPage'
	},
	{
		name: 'products',
		url: '/products',
		component: 'productsListPage'
	},
	{
		name: 'signup',
		url: '/signup',
		component: 'signupPage'
	}
]

export default routes
