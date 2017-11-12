import { check } from 'express-validator/check'

import { productKey } from './products'

const quantity = check('quantity')
	.trim()
	.isInt({ min: 0 })
	.toInt()

export { productKey, quantity }
