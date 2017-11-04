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

const findAllBySeller = userId => {
	return db.transaction(trx => trx('Order')
		.select(['orderId', 'date'])
		.then(orders => {
			return trx('OrderProduct')
				.select([
					'OrderProduct.orderId',
					'OrderProduct.quantity',
					'Product.price',
					'Product.shippingPrice',
					'Product.discount'
				])
				.innerJoin('Product', 'OrderProduct.productId', 'Product.productId')
				.where('Product.userId', userId)
				.then(orderProducts => orderProducts.map(orderProduct => {
					const order = orders.find(i => i.orderId === orderProduct.orderId)
					return {
						...orderProduct,
						date: order.date
					}
				}))
		}))
}

const create = userId => {
	return db.transaction(trx => trx('UserBasket')
		.innerJoin('Product', function() {
			this.on('Product.productKey', '=', 'UserBasket.productKey').onNull('Product.validTo')
		})
		.innerJoin('ProductStock', 'ProductStock.productKey', 'UserBasket.productKey')
		.where('UserBasket.userId', userId)
		.then(rows => {
			if (rows.length === 0) { throw new Error(422) }
			return Promise.all(rows.map(row => {
				return trx('ProductStock')
					.where('productKey', row.productKey)
					.update({ stock: Math.max(0, row.stock - row.quantity) })
			}))
			.then(() => {
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
	findAllBySeller,
	create,
	deleteOne
}
