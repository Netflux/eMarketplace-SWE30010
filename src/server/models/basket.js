import db from 'server/database'

const defaultProjection = ['UserBasket.productKey', 'UserBasket.quantity']

const findAll = userId => {
	return db('UserBasket')
		.select(defaultProjection)
		.where('userId', userId)
}

const upsert = basketItem => {
	return db.transaction(trx => trx('UserBasket')
		.where({
			userId: basketItem.userId,
			productKey: basketItem.productKey
		})
		.first()
		.then(row => {
			if (row) {
				return trx('UserBasket')
					.where({
						userId: basketItem.userId,
						productKey: basketItem.productKey
					})
					.update('quantity', basketItem.quantity)
			}

			return trx('UserBasket')
				.insert({
					userId: basketItem.userId,
					productKey: basketItem.productKey,
					quantity: basketItem.quantity
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
