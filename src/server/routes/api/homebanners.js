import Express from 'express'
import { validationResult } from 'express-validator/check'

import HomeBannerModel from 'server/models/homebanners'
import * as validators from './validators/homebanners'
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
	HomeBannerModel.findAll()
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', multer.single('image'), (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}
	if (!req.file) {
		return res.sendStatus(422)
	}

	const homeBanner = {
		userId: req.user.userId,
		imageUrl: `images/uploads/${req.file.filename}`,
		validFrom: Date.now()
	}

	HomeBannerModel.create(homeBanner)
		.then(() => res.sendStatus(204))
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

	HomeBannerModel.deleteOne(req.params.homeBannerId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
