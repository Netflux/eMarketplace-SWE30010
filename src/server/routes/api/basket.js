import Express from 'express'
import { validationResult } from 'express-validator/check'

import BasketModel from 'server/models/basket'
import * as validators from './validators/basket'

const router = Express.Router()

const validation = (req, res, next) => {
	if (!req.user) { return res.sendStatus(403) }

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', validation, (req, res) => {
	BasketModel.findAll(req.user.userId)
		.then(rows => res.status(200).json({ data: rows }))
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
	const basketItem = {
		userId: req.user.userId,
		productKey: req.body.productKey,
		quantity: req.body.quantity
	}

	BasketModel.upsert(basketItem)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:productKey', [
	validators.productKey,
	validators.quantity,
	validation
], (req, res) => {
	const basketItem = {
		userId: req.user.userId,
		productKey: req.params.productKey,
		quantity: req.body.quantity
	}

	BasketModel.upsert(basketItem)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:productKey', [
	validators.productKey,
	validation
], (req, res) => {
	BasketModel.deleteOne(req.params.productKey, req.user.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
