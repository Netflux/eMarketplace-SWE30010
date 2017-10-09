import { check } from 'express-validator/check'

import db from 'server/database'
import { productKey as vProductKey } from './products'

const productKey = vProductKey
	.custom(value => db('Product').where('productKey', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid product')

const quantity = check('quantity')
	.trim()
	.isInt({ min: 0 })
	.toInt()

export { productKey, quantity }
