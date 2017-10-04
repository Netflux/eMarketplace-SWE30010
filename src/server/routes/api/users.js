import Express from 'express'
import Passport from 'passport'
import { validationResult } from 'express-validator/check'

import db from '../../database'
import { hashPassword } from '../../auth'
import * as validators from './validators/users'

const router = Express.Router()

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
	validators.password
], (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

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
	validators.role
], (req, res) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({ errors: validationErrors.mapped() })
	}

	hashPassword(req.body.password)
		.then(hash => {
			return db('User').insert({
				username: req.body.username,
				password: hash,
				email: req.body.email,
				newsletter: req.body.newsletter,
				role: req.body.role
			})
		})
		.then(() => {
			res.sendStatus(204)
		})
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

export default router
