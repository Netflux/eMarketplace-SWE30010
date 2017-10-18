import Express from 'express'
import Passport from 'passport'
import { validationResult } from 'express-validator/check'

import UserModel from 'server/models/users'
import * as validators from './validators/users'

const router = Express.Router()

const validation = (req, res, next) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	next()
}

router.get('/', (req, res) => {
	UserModel.findAll()
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

router.get('/login', (req, res) => {
	if (req.user) {
		return res.status(200).json({
			data: {
				username: req.user.username,
				email: req.user.email,
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
					username: user.username,
					email: user.email,
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
