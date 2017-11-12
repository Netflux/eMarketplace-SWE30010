import db from 'server/database'

const defaultProjection = ['UserBasket.productKey', 'UserBasket.quantity']

const findAll = userId => {
	return db('UserBasket')
		.select(defaultProjection)
		.where('userId', userId)
}

const upsert = basketItem => {
	const timestamp = Date.now()
	return db.transaction(trx => trx('ProductStock')
		.where('productKey', basketItem.productKey)
		.first()
		.then(row => {
			if (!row || row.stock < basketItem.quantity) { throw new Error(422) }
			return trx('UserBasket')
				.where({
					userId: basketItem.userId,
					productKey: basketItem.productKey
				})
				.first()
		})
		.then(row => {
			if (row) {
				return trx('UserBasket')
					.where({
						userId: basketItem.userId,
						productKey: basketItem.productKey
					})
					.update({
						quantity: basketItem.quantity,
						updatedAt: timestamp
					})
			}

			return trx('UserBasket')
				.insert({
					userId: basketItem.userId,
					productKey: basketItem.productKey,
					quantity: basketItem.quantity,
					createdAt: timestamp,
					updatedAt: timestamp
				})
		}))
}

const deleteOne = (productKey, userId) => {
	return db('UserBasket')
		.where({
			productKey,
			userId
		})
		.del()
}

export default {
	findAll,
	upsert,
	deleteOne
}
