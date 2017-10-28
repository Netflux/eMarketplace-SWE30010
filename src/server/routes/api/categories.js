import Express from 'express'
import { validationResult } from 'express-validator/check'

import CategoryModel from 'server/models/categories'
import ProductModel from 'server/models/products'
import * as validators from './validators/categories'
import * as sharedValidators from './validators/shared'
import multer from 'server/utils/multer'

const router = Express.Router()

const validation = (req, res, next) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', (req, res) => {
	CategoryModel.findAll()
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', multer.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'banner', maxCount: 1 }
]), [
	validators.title,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	const imageFile = req.files['image'] ? req.files['image'][0] : undefined
	const bannerFile = req.files['banner'] ? req.files['banner'][0] : undefined

	if (!imageFile || !bannerFile) {
		return res.sendStatus(422)
	}

	const category = {
		title: req.body.title,
		imageUrl: `images/uploads/${imageFile.filename}`,
		bannerUrl: `images/uploads/${bannerFile.filename}`
	}

	CategoryModel.create(category)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:categoryId/products', [
	validators.categoryId,
	sharedValidators.timestamp,
	validation
], (req, res) => {
	ProductModel.findAll(req.params.categoryId, req.query.timestamp)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:categoryId', multer.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'banner', maxCount: 1 }
]), [
	validators.categoryId,
	validators.title,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	const imageFile = req.files['image'] ? req.files['image'][0] : undefined
	const bannerFile = req.files['banner'] ? req.files['banner'][0] : undefined

	const category = {
		title: req.body.title,
		imageUrl: imageFile ? `images/uploads/${imageFile.filename}` : undefined,
		bannerUrl: bannerFile ? `images/uploads/${bannerFile.filename}` : undefined
	}

	CategoryModel.update(req.params.categoryId, category)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:categoryId', [
	validators.categoryId,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	CategoryModel.deleteOne(req.params.categoryId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
