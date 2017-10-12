import { check } from 'express-validator/check'

import db from 'server/database'

const userId = check('userId')
	.trim()
	.isInt({ min: 0 })
	.toInt()
	.custom(value => db('User').where('userId', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid user')

const loginUsername = check('username')
	.trim()
	.isLength({ min: 6, max: 24 }).withMessage('must be 6 to 24 characters long')
	.matches(/^\w{6,24}$/).withMessage('must only contain letters, numbers or underscores')
	.escape()

const username = check('username')
	.trim()
	.isLength({ min: 6, max: 24 }).withMessage('must be 6 to 24 characters long')
	.matches(/^\w{6,24}$/).withMessage('must only contain letters, numbers or underscores')
	.escape()
	.custom(value => db('User').where('username', value).count('* AS count').then(rows => rows[0].count === 0)).withMessage('has already been taken')

const password = check('password')
	.trim()
	.isLength({ min: 8 }).withMessage('must be at least 8 characters long')
	.escape()

const email = check('email')
	.trim()
	.isEmail().withMessage('must be a valid email address')
	.normalizeEmail()
	.custom(value => db('User').where('email', value).count('* AS count').then(rows => rows[0].count === 0)).withMessage('has already been taken')

const newsletter = check('newsletter')
	.trim()
	.isInt({ min: 0, max: 1 })
	.toInt()

const role = check('role')
	.trim()
	.isIn(['Buyer', 'Seller', 'Administrator'])
	.escape()

const name = check('name')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

const street = check('street')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

const city = check('city')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

const state = check('state')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

const zip = check('zip')
	.trim()
	.isPostalCode('any')
	.escape()

const phone = check('phone')
	.trim()
	.isMobilePhone('any')
	.escape()

export {
	userId,
	loginUsername,
	username,
	password,
	email,
	newsletter,
	role,
	name,
	street,
	city,
	state,
	zip,
	phone
}
