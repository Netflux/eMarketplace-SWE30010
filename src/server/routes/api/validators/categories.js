import { check } from 'express-validator/check'

import db from 'server/database'

const categoryId = check('categoryId')
	.trim()
	.isInt({ min: 0 })
	.toInt()
	.custom(value => db('Category').where('categoryId', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid category')

const title = check('title')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

export { categoryId, title }
