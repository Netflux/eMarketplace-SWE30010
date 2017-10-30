import Express from 'express'
import { validationResult } from 'express-validator/check'

import OrderModel from 'server/models/orders'
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
	OrderModel.findAll(req.user.userId)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', validation, (req, res) => {
	OrderModel.create(req.user.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:orderId', [
	validators.orderId,
	validation
], (req, res) => {
	OrderModel.deleteOne(req.params.orderId, req.user.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
