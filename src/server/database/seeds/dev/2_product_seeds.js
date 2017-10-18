const categoryList = [
	{
		categoryId: 1,
		title: 'Category 1',
		imageUrl: '',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 2,
		title: 'Category 2',
		imageUrl: '',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 3,
		title: 'Category 3',
		imageUrl: '',
		bannerUrl: '',
		validFrom: 0
	}
]
const productList = [
	{
		productId: 1,
		userId: 1,
		categoryId: 1,
		productKey: 'ProductKey1',
		title: 'Product Title 1',
		description: 'Product Description 1',
		price: 50.00,
		shippingPrice: 25.00,
		discount: 10,
		validFrom: 0
	},
	{
		productId: 2,
		userId: 1,
		categoryId: 2,
		productKey: 'ProductKey2',
		title: 'Product Title 2',
		description: 'Product Description 2',
		price: 25.50,
		shippingPrice: 10.25,
		discount: 0,
		validFrom: 0
	},
	{
		productId: 3,
		userId: 1,
		categoryId: 2,
		productKey: 'ProductKey3',
		title: 'Product Title 3',
		description: 'Product Description 3',
		price: 77.77,
		shippingPrice: 33.33,
		discount: 50,
		validFrom: 0
	}
]
const productStockList = [
	{
		productKey: 'ProductKey1',
		stock: 100
	},
	{
		productKey: 'ProductKey2',
		stock: 0
	},
	{
		productKey: 'ProductKey3',
		stock: 15
	}
]

exports.seed = knex => {
	return knex('ProductStock').del()
		.then(() => knex('Product').del())
		.then(() => knex('Category').del())
		.then(() => knex('Category').insert(categoryList))
		.then(() => knex('Product').insert(productList))
		.then(() => knex('ProductStock').insert(productStockList))
}
