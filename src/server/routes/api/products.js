import Express from 'express'
import { validationResult } from 'express-validator/check'
import ShortId from 'shortid'

import db from 'server/database'
import * as validators from './validators/products'

const router = Express.Router()

const validation = (req, res, next) => {
	if (!req.user || req.user.role === 'Buyer') { return res.sendStatus(403) }

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', (req, res) => {
	db('Product')
		.innerJoin('ProductStock', 'ProductStock.productKey', 'Product.productKey')
		.whereNull('validTo')
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', [
	validators.categoryId,
	validators.title,
	validators.description,
	validators.price,
	validators.shippingPrice,
	validators.stock,
	validators.discount,
	validation
], (req, res) => {
	const productKey = ShortId.generate()
	db.transaction(trx => trx('Product')
		.insert({
			userId: req.user.userId,
			categoryId: req.body.categoryId,
			productKey,
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			shippingPrice: req.body.shippingPrice,
			discount: req.body.discount,
			validFrom: Date.now()
		})
		.then(() => {
			return trx('ProductStock')
				.insert({
					productKey,
					stock: req.body.stock
				})
		})
		.then(() => res.sendStatus(204)))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:productKey/reviews', [
	validators.productKey
], (req, res) => {
	db('ProductReview')
		.where('productKey', req.params.productKey)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

// TODO - Enable once Discussion table is added
// router.get('/:productKey/discussions', [
// 	validators.productKey
// ], (req, res) => {
// 	db('Discussion')
// 		.where('productKey', req.params.productKey)
// 		.then(rows => res.status(200).json({ data: rows }))
// 		.catch(err => {
// 			console.error(err)
// 			res.sendStatus(500)
// 		})
// })

router.get('/:productKey', [
	validators.productKey
], (req, res) => {
	db('Product')
		.innerJoin('ProductStock', 'ProductStock.productKey', 'Product.productKey')
		.where('Product.productKey', req.params.productKey)
		.whereNull('validTo')
		.first()
		.then(row => res.status(200).json({ data: [row] }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:productKey', [
	validators.productKey,
	validators.categoryId,
	validators.title,
	validators.description,
	validators.price,
	validators.shippingPrice,
	validators.stock,
	validators.discount,
	validation
], (req, res) => {
	db.transaction(trx => trx('Product')
		.where('productKey', req.params.productKey)
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return trx('ProductStock')
				.where('productKey', req.params.productKey)
				.update('stock', req.body.stock)
		})
		.then(() => {
			return trx('Product')
				.where({
					productKey: req.params.productKey,
					userId: req.user.userId
				})
				.whereNull('validTo')
				.update('validTo', Date.now())
		})
		.then(() => {
			return trx('Product')
				.insert({
					categoryId: req.body.categoryId,
					productKey: req.params.productKey,
					title: req.body.title,
					description: req.body.description,
					price: req.body.price,
					shippingPrice: req.body.shippingPrice,
					discount: req.body.discount,
					validFrom: Date.now()
				})
		})
		.then(() => res.sendStatus(204)))
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
	db.transaction(trx => trx('Product')
		.where({
			productKey: req.params.productKey,
			userId: req.user.userId
		})
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return trx('Product')
				.where({
					productKey: req.params.productKey,
					userId: req.user.userId
				})
				.whereNull('validTo')
				.update('validTo', Date.now())
		})
		.then(() => res.sendStatus(204)))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
