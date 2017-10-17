import Express from 'express'
import { validationResult } from 'express-validator/check'

import db from 'server/database'
import * as validators from './validators/categories'
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
	db('Category')
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', multer.single('image'), [
	validators.title,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	db('Category')
		.insert({
			title: req.body.title,
			imageUrl: req.file ? `images/uploads/${req.file.filename}` : '',
			validFrom: Date.now()
		})
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:categoryId/products', [
	validators.categoryId,
	validation
], (req, res) => {
	db('Product')
		.where('categoryId', req.params.categoryId)
		.whereNull('validTo')
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:categoryId', [
	validators.categoryId,
	validation
], (req, res) => {
	db('Category')
		.where('categoryId', req.params.categoryId)
		.first()
		.then(row => res.status(200).json({ data: [row] }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:categoryId', multer.single('image'), [
	validators.categoryId,
	validators.title,
	validation
], (req, res) => {
	db.transaction(trx => trx('Category')
		.where('categoryId', req.params.categoryId)
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return trx('Category')
				.where('categoryId', req.params.categoryId)
				.whereNull('validTo')
				.update('validTo', Date.now())
				.then(() => {
					return trx('Category')
						.insert({
							title: req.body.title,
							imageUrl: req.file ? `images/uploads/${req.file.filename}` : row.imageUrl,
							validFrom: Date.now()
						})
				})
		})
		.then(() => res.sendStatus(204)))
		.catch(err => {
			if (err.message === '422') { return res.sendStatus(422) }
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:categoryId', [
	validators.categoryId,
	validation
], (req, res) => {
	db.transaction(trx => trx('Category')
		.where('categoryId', req.params.categoryId)
		.first()
		.then(row => {
			if (!row) { throw new Error(422) }
			return trx('Category')
				.where('categoryId', req.params.categoryId)
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
