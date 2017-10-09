import Express from 'express'
import { validationResult } from 'express-validator/check'

import db from 'server/database'
import * as validators from './validators/basket'

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
	db('UserBasket')
		.where('userId', req.user.userId)
		.then(rows => {
			res.status(200).json({ data: rows })
		})
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', [
	validators.productKey,
	validators.quantity,
	validation
], (req, res) => {
	db.transaction(trx => trx('UserBasket')
		.where({
			userId: req.user.userId,
			productKey: req.params.productKey
		})
		.first()
		.then(row => {
			if (row) { throw new Error(422) }
			return trx('UserBasket')
				.insert({
					userId: req.user.userId,
					productKey: req.body.productKey,
					quantity: req.body.quantity
				})
				.then(() => {
					return res.sendStatus(204)
				})
		}))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:productKey', [
	validators.productKey,
	validators.quantity,
	validation
], (req, res) => {
	db.transaction(trx => trx('UserBasket')
		.where({
			userId: req.user.userId,
			productKey: req.params.productKey
		})
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return trx('UserBasket')
				.where({
					userId: req.user.userId,
					productKey: req.params.productKey
				})
				.update('quantity', req.body.quantity)
		})
		.then(() => {
			return res.sendStatus(204)
		}))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:productKey', [
	validators.productKey,
	validation
], (req, res) => {
	db.transaction(trx => trx('UserBasket')
		.where({
			userId: req.user.userId,
			productKey: req.params.productKey
		})
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return db('UserBasket')
				.where({
					productKey: req.params.productKey,
					userId: req.user.userId
				})
				.del()
		})
		.then(() => {
			return res.sendStatus(204)
		}))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
