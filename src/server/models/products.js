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

const findAll = (categoryId, timestamp = 0) => {
	return db.transaction(trx => {
		return trx('ProductImage')
			.select(['productImageId', 'productKey', 'imageUrl'])
			.whereNull('validTo')
			.then(images => {
				return trx('Product')
					.select(defaultProjection)
					.innerJoin('ProductStock', 'ProductStock.productKey', 'Product.productKey')
					.modify(queryBuilder => {
						if (categoryId !== null && categoryId !== undefined) {
							queryBuilder.where('categoryId', categoryId)
						}
					})
					.where('validFrom', '>=', timestamp)
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
	const timestamp = Date.now()
	return db.transaction(trx => trx('Product')
		.insert({ ...product, validFrom: timestamp })
		.then(() => {
			return trx('ProductStock')
				.insert({
					productKey: product.productKey,
					stock,
					createdAt: timestamp,
					updatedAt: timestamp
				})
		})
		.then(() => {
			return trx('ProductImage')
				.insert(images.map(image => ({
					productKey: product.productKey,
					imageUrl: `images/uploads/${image.filename}`,
					validFrom: timestamp
				})))
		}))
}

const update = (product, stock) => {
	const timestamp = Date.now()
	return db.transaction(trx => trx('ProductStock')
		.where('productKey', product.productKey)
		.update({
			stock,
			updatedAt: timestamp
		})
		.then(() => {
			return trx('Product')
				.where({
					productKey: product.productKey,
					userId: product.userId
				})
				.whereNull('validTo')
				.update('validTo', timestamp)
		})
		.then(() => {
			return trx('Product')
				.insert({
					...product,
					validFrom: timestamp
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
	},
	upsert: (userId, review) => {
		return db.transaction(trx => trx('ProductReview')
			.where({
				userId,
				productKey: review.productKey
			})
			.first()
			.then(row => {
				if (row) {
					return trx('ProductReview')
						.where({
							userId,
							productKey: review.productKey
						})
						.update({
							...review,
							date: Date.now()
						})
				}

				return trx('ProductReview')
					.insert({
						userId,
						...review,
						date: Date.now()
					})
			}))
	},
	deleteOne: (productKey, userId) => {
		return db('ProductReview')
			.where({
				userId,
				productKey
			})
			.del()
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
