import db from 'server/database'

const findAll = userId => {
	return db.transaction(trx => {
		return trx('OrderProduct')
			.select(['orderId', 'productId', 'quantity'])
			.then(orderProducts => {
				return trx('Order')
					.select(['orderId', 'date'])
					.where('userId', userId)
					.then(rows => rows.map(row => ({
						...row,
						products: orderProducts
							.filter(product => product.orderId === row.orderId)
							.map(product => ({
								productId: product.productId,
								quantity: product.quantity
							}))
					})))
			})
	})
}

const create = userId => {
	return db.transaction(trx => trx('UserBasket')
		.innerJoin('Product', function() {
			this.on('Product.productKey', '=', 'UserBasket.productKey').onNull('Product.validTo')
		})
		.where('UserBasket.userId', userId)
		.then(rows => {
			if (rows.length === 0) { throw new Error(422) }
			return trx('Order')
				.insert({
					userId,
					date: Date.now()
				})
				.then(response => {
					return trx('OrderProduct')
						.insert(rows.map(row => ({
							orderId: response[0],
							productId: row.productId,
							quantity: row.quantity
						})))
				})
		})
		.then(() => {
			return trx('UserBasket')
				.where('userId', userId)
				.del()
		}))
}

const deleteOne = (orderId, userId) => {
	return db('Order')
		.where('Order.orderId', orderId)
		.where('Order.userId', userId)
		.del()
}

export default {
	findAll,
	create,
	deleteOne
}
