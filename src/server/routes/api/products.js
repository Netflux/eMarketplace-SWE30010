import Express from 'express'
import { validationResult } from 'express-validator/check'
import ShortId from 'shortid'

import ProductModel from 'server/models/products'
import * as validators from './validators/products'
import * as sharedValidators from './validators/shared'
import multer from 'server/utils/multer'

const router = Express.Router()

const validation = userValidation => (req, res, next) => {
	
	if (userValidation && (!req.user || req.user.role === 'Buyer')) { return res.sendStatus(403) }

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', [
	sharedValidators.timestamp,
	validation(false)
], (req, res) => {
	ProductModel.findAll(null, req.query.timestamp)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', multer.array('images', 8), [
	validators.categoryId,
	validators.title,
	validators.description,
	validators.price,
	validators.shippingPrice,
	validators.discount,
	validators.stock,
	validation(true)
], (req, res) => {
	const product = {
		userId: req.user.userId,
		categoryId: req.body.categoryId,
		productKey: ShortId.generate(),
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		shippingPrice: req.body.shippingPrice,
		discount: req.body.discount
	}

	ProductModel.create(product, req.body.stock, req.files)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/images/:productImageId', [
	validators.productImageId,
	validation(true)
], (req, res) => {
	ProductModel.images.deleteOne(req.params.productImageId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:productKey/images', multer.array('images', 8), [
	validators.productKey,
	validation(true)
], (req, res) => {
	ProductModel.images.create(req.params.productKey, req.files)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:productKey/reviews', [
	validators.productKey,
	validation(false)
], (req, res) => {
	ProductModel.reviews.findAll(req.params.productKey)
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
	validators.productKey,
	validation(false)
], (req, res) => {
	ProductModel.findOne(req.params.productKey)
		.then(row => res.status(200).json({ data: row }))
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
	validators.discount,
	validators.stock,
	validation(true)
], (req, res) => {
	const product = {
		userId: req.user.userId,
		categoryId: req.body.categoryId,
		productKey: req.params.productKey,
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		shippingPrice: req.body.shippingPrice,
		discount: req.body.discount
	}

	ProductModel.update(product, req.body.stock)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:productKey', [
	validators.productKey,
	validation(true)
], (req, res) => {
	ProductModel.deleteOne(req.params.productKey, req.user.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
