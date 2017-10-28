import db from 'server/database'

const defaultProjection = [
	'Product.productId',
	'Product.userId',
	'Product.categoryId',
	'Product.productKey',
	'Product.title',
	'Product.description',
	'Product.price',
	'Product.shippingPrice',
	'Product.discount',
	'ProductStock.stock'
]

const findOne = productKey => {
	return db.transaction(trx => {
		return trx('ProductImage')
			.select(['productImageId', 'imageUrl'])
			.where('productKey', productKey)
			.whereNull('validTo')
			.then(images => {
				return trx('Product')
					.select(defaultProjection)
					.innerJoin('ProductStock', 'ProductStock.productKey', 'Product.productKey')
					.where('Product.productKey', productKey)
					.whereNull('validTo')
					.first()
					.then(row => ({
						...row,
						images
					}))
			})
	})
}

const findAll = categoryId => {
	return db.transaction(trx => {
		return trx('ProductImage')
			.select(['productImageId', 'productKey', 'imageUrl'])
			.whereNull('validTo')
			.then(images => {
				return trx('Product')
					.select(defaultProjection)
					.innerJoin('ProductStock', 'ProductStock.productKey', 'Product.productKey')
					.modify(queryBuilder => {
						if (categoryId !== undefined) {
							queryBuilder.where('categoryId', categoryId)
						}
					})
					.whereNull('validTo')
					.then(rows => rows.map(row => ({
						...row,
						images: images
							.filter(image => image.productKey === row.productKey)
							.map(image => ({
								productImageId: image.productImageId,
								imageUrl: image.imageUrl
							}))
					})))
			})
	})
}

const create = (product, stock, images) => {
	return db.transaction(trx => trx('Product')
		.insert({ ...product, validFrom: Date.now() })
		.then(() => {
			return trx('ProductStock')
				.insert({
					productKey: product.productKey,
					stock: stock
				})
		})
		.then(() => {
			return trx('ProductImage')
				.insert(images.map(image => ({
					productKey: product.productKey,
					imageUrl: `images/uploads/${image.filename}`,
					validFrom: Date.now()
				})))
		}))
}

const update = (product, stock) => {
	return db.transaction(trx => trx('ProductStock')
		.where('productKey', product.productKey)
		.update('stock', stock)
		.then(() => {
			return trx('Product')
				.where({
					productKey: product.productKey,
					userId: product.userId
				})
				.whereNull('validTo')
				.update('validTo', Date.now())
		})
		.then(() => {
			return trx('Product')
				.insert({
					...product,
					validFrom: Date.now()
				})
		}))
}

const deleteOne = (productKey, userId) => {
	return db('Product')
		.where({
			productKey,
			userId
		})
		.whereNull('validTo')
		.update('validTo', Date.now())
}

const images = {
	create: (productKey, images) => {
		return db('ProductImage')
			.insert(images.map(image => ({
				productKey,
				imageUrl: `images/uploads/${image.filename}`,
				validFrom: Date.now()
			})))
	},
	deleteOne: productImageId => {
		return db('ProductImage')
			.where('productImageId', productImageId)
			.whereNull('validTo')
			.update('validTo', Date.now())
	}
}

const reviews = {
	findAll: productKey => {
		return db('ProductReview')
			.where('productKey', productKey)
	}
}

export default {
	findOne,
	findAll,
	create,
	update,
	deleteOne,
	images,
	reviews
}
