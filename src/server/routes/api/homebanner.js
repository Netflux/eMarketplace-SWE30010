import Express from 'express'
import { validationResult } from 'express-validator/check'

import db from 'server/database'
import * as validators from './validators/homebanner'

const router = Express.Router()

const validation = (req, res, next) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', (req, res) => {
	db('HomeBanner')
		.whereNull('validTo')
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	db('HomeBanner')
		.insert({
			userId: req.user.userId,
			validFrom: Date.now()
		})
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:homeBannerId', [
	validators.homeBannerId,
	validation
], (req, res) => {
	db('HomeBanner')
		.where('homeBannerId', req.params.homeBannerId)
		.first()
		.then(row => res.status(200).json({ data: [row] }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:homeBannerId', [
	validators.homeBannerId,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}
	
	db('HomeBanner')
		.where('homeBannerId', req.params.homeBannerId)
		.whereNull('validTo')
		.update('validTo', Date.now())
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
