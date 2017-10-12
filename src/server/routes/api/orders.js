import Express from 'express'
import { validationResult } from 'express-validator/check'

import db from 'server/database'
import * as validators from './validators/orders'

const router = Express.Router()

const validation = (req, res, next) => {
	if (!req.user) {
		return res.sendStatus(403)
	}

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', validation, (req, res) => {
	db('Order')
		.innerJoin('OrderProduct', 'OrderProduct.orderId', 'Order.orderId')
		.where('userId', req.user.userId)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', validation, (req, res) => {
	db.transaction(trx => trx('UserBasket')
		.innerJoin('Product', function() {
			this.on('Product.productKey', '=', 'UserBasket.productKey').onNull('Product.validTo')
		})
		.where('UserBasket.userId', req.user.userId)
		.then(rows => {
			if (rows.length === 0) { throw new Error(422) }
			return trx('Order')
				.insert({
					userId: req.user.userId,
					date: Date.now()
				})
				.then(response => {
					return trx('OrderProduct')
						.insert(rows.map(row => ({
							orderId: response[0],
							productId: row.productId,
							quantity: row.quantity,
							status: 'Pending'
						})))
				})
		})
		.then(() => {
			return trx('UserBasket')
				.where('userId', req.user.userId)
				.del()
		})
		.then(() => res.sendStatus(204)))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:orderId', [
	validators.orderId,
	validation
], (req, res) => {
	db('Order')
		.innerJoin('OrderProduct', 'OrderProduct.orderId', 'Order.orderId')
		.where('Order.orderId', req.params.orderId)
		.where('Order.userId', req.user.userId)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:orderId', [
	validators.orderId,
	validators.status,
	validation
], (req, res) => {
	db('Order')
		.where('Order.orderId', req.params.orderId)
		.where('Order.userId', req.user.userId)
		.update('status', req.body.status)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:orderId', [
	validators.orderId,
	validation
], (req, res) => {
	db('Order')
		.where('Order.orderId', req.params.orderId)
		.where('Order.userId', req.user.userId)
		.del()
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
