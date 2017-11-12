import { check } from 'express-validator/check'

const timestamp = check('timestamp')
	.optional()
	.trim()
	.isInt({ min: 0 })
	.toInt()

export { timestamp }
