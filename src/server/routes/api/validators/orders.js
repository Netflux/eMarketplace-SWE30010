import { check } from 'express-validator/check'

import db from 'server/database'
import { userId } from './users'

const orderId = check('orderId')
	.trim()
	.isInt({ min: 0 })
	.toInt()
	.custom(value => db('Order').where('orderId', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid order')

const quantity = check('quantity')
	.trim()
	.isInt({ min: 0 })
	.toInt()

const status = check('status')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

export { orderId, userId, quantity, status }
