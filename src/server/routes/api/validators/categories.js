import { check } from 'express-validator/check'

const categoryId = check('categoryId')
	.trim()
	.isInt({ min: 0 })
	.toInt()

const title = check('title')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

export { title }
