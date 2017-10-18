const categoryList = [
	{
		categoryId: 1,
		title: 'Jewellery',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 2,
		title: 'Soft Toys',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 3,
		title: 'Handmade items',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 4,
		title: 'Room decor',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 5,
		title: 'Vintage goods',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	},
	{
		categoryId: 6,
		title: 'Clothings',
		imageUrl: '/',
		bannerUrl: '',
		validFrom: 0
	}
]
const productList = [
	{
		productId: 1,
		userId: 2,
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
		userId: 2,
		categoryId: 1,
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
		userId: 3,
		categoryId: 2,
		productKey: 'ProductKey3',
		title: 'Product Title 3',
		description: 'Product Description 3',
		price: 77.77,
		shippingPrice: 33.33,
		discount: 50,
		validFrom: 0
	},
	{
		productId: 4,
		userId: 2,
		categoryId: 2,
		productKey: 'ProductKey4',
		title: 'Product Title 4',
		description: 'Product Description 4',
		price: 100.23,
		shippingPrice: 10.33,
		discount: 20,
		validFrom: 0
	},
	{
		productId: 5,
		userId: 2,
		categoryId: 3,
		productKey: 'ProductKey5',
		title: 'Product Title 5',
		description: 'Product Description 5',
		price: 15.50,
		shippingPrice: 10.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 6,
		userId: 3,
		categoryId: 3,
		productKey: 'ProductKey6',
		title: 'Product Title 6',
		description: 'Product Description 6',
		price: 20.00,
		shippingPrice: 10.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 7,
		userId: 2,
		categoryId: 4,
		productKey: 'ProductKey7',
		title: 'Product Title 7',
		description: 'Product Description 7',
		price: 5.50,
		shippingPrice: 6.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 8,
		userId: 2,
		categoryId: 4,
		productKey: 'ProductKey8',
		title: 'Product Title 8',
		description: 'Product Description 8',
		price: 9.50,
		shippingPrice: 5.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 9,
		userId: 3,
		categoryId: 5,
		productKey: 'ProductKey9',
		title: 'Product Title 9',
		description: 'Product Description 9',
		price: 15.50,
		shippingPrice: 15.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 10,
		userId: 3,
		categoryId: 5,
		productKey: 'ProductKey10',
		title: 'Product Title 10',
		description: 'Product Description 10',
		price: 55.50,
		shippingPrice: 8.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 11,
		userId: 2,
		categoryId: 6,
		productKey: 'ProductKey11',
		title: 'Product Title 11',
		description: 'Product Description 11',
		price: 65.50,
		shippingPrice: 8.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 12,
		userId: 3,
		categoryId: 6,
		productKey: 'ProductKey12',
		title: 'Product Title 12',
		description: 'Product Description 12',
		price: 125.50,
		shippingPrice: 0,
		discount: 10,
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
	},
	{
		productKey: 'ProductKey4',
		stock: 5
	},
	{
		productKey: 'ProductKey5',
		stock: 13
	},
	{
		productKey: 'ProductKey6',
		stock: 4
	},
	{
		productKey: 'ProductKey7',
		stock: 9
	},
	{
		productKey: 'ProductKey8',
		stock: 100
	},
	{
		productKey: 'ProductKey9',
		stock: 5
	},
	{
		productKey: 'ProductKey10',
		stock: 30
	},
	{
		productKey: 'ProductKey11',
		stock: 0
	},
	{
		productKey: 'ProductKey12',
		stock: 10
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
