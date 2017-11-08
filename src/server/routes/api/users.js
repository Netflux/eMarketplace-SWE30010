import Express from 'express'
import Passport from 'passport'
import { validationResult } from 'express-validator/check'

import UserModel from 'server/models/users'
import * as validators from './validators/users'
import * as sharedValidators from './validators/shared'

const router = Express.Router()

const validation = (req, res, next) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', [
	sharedValidators.timestamp,
	validation
], (req, res) => {
	UserModel.findAll(req.query.timestamp)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/', [
	validators.username,
	validators.password,
	validators.email,
	validators.newsletter,
	validators.role,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	const user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		newsletter: req.body.newsletter,
		role: req.body.role
	}

	UserModel.create(user)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/address', [
	validators.name,
	validators.street,
	validators.city,
	validators.state,
	validators.zip,
	validators.phone,
	validation
], (req, res) => {
	if (!req.user) { return res.sendStatus(403) }

	const address = {
		name: req.body.name,
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		phone: req.body.phone
	}

	UserModel.address.upsert(req.user.userId, address)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/address', (req, res) => {
	if (!req.user) { return res.sendStatus(403) }

	UserModel.address.deleteOne(req.user.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/login', (req, res) => {
	if (req.user) {
		return res.status(200).json({
			data: {
				userId: req.user.userId,
				username: req.user.username,
				email: req.user.email,
				address: {
					name: req.user.name,
					street: req.user.street,
					city: req.user.city,
					state: req.user.state,
					zip: req.user.zip,
					phone: req.user.phone
				},
				newsletter: req.user.newsletter,
				role: req.user.role
			}
		})
	}

	res.sendStatus(403)
})

router.post('/login', [
	validators.loginUsername,
	validators.password,
	validation
], (req, res) => {
	Passport.authenticate('local', (err, user) => {
		if (err) {
			console.error(err)
			return res.sendStatus(500)
		}
		if (!user) { return res.sendStatus(403) }
		req.login(user, err => {
			if (err) {
				console.error(err)
				return res.sendStatus(500)
			}
			return res.status(200).json({
				data: {
					userId: user.userId,
					username: user.username,
					email: user.email,
					address: {
						name: user.name,
						street: user.street,
						city: user.city,
						state: user.state,
						zip: user.zip,
						phone: user.phone
					},
					newsletter: user.newsletter,
					role: user.role
				}
			})
		})
	})(req, res)
})

router.post('/logout', (req, res) => {
	req.logout()
	res.sendStatus(204)
})

router.post('/register', [
	validators.username,
	validators.password,
	validators.email,
	validators.newsletter,
	validation
], (req, res) => {
	const user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		newsletter: req.body.newsletter,
		role: 'Buyer'
	}

	UserModel.create(user)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.get('/:userId', [
	validators.userId,
	validation
], (req, res) => {
	UserModel.findOne(req.params.userId)
		.then(rows => res.status(200).json({ data: rows }))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.post('/:userId', [
	validators.userId,
	validators.email,
	validators.newsletter,
	validators.role,
	validation
], (req, res) => {
	if (!req.user || (req.user.userId !== req.params.userId && req.user.role !== 'Administrator')) {
		return res.sendStatus(403)
	}

	const fields = {
		email: req.body.email,
		newsletter: req.body.newsletter
	}
	if (req.user.role === 'Administrator') { fields.role = req.body.role }

	UserModel.update(req.params.userId, fields)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

router.delete('/:userId', [
	validators.userId,
	validation
], (req, res) => {
	if (!req.user || req.user.role !== 'Administrator') {
		return res.sendStatus(403)
	}

	UserModel.deleteOne(req.params.userId)
		.then(() => res.sendStatus(204))
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
