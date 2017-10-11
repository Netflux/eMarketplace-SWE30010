import { check } from 'express-validator/check'

import db from 'server/database'

const productId = check('productId')
	.trim()
	.isInt({ min: 0 })
	.toInt()

const categoryId = check('categoryId')
	.trim()
	.isInt({ min: 0 })
	.toInt()
	.custom(value => db('Category').where('categoryId', value).count('* AS count').then(rows => rows[0].count === 0)).withMessage('must be a valid category')

const productKey = check('productKey')
	.trim()
	.matches(/^[A-Za-z0-9_-]+$/)
	.escape()

const title = check('title')
	.trim()
	.exists().withMessage('must be filled')
	.isLength({ min: 1, max: 255 }).withMessage('cannot exceed 255 characters')
	.escape()

const description = check('description')
	.trim()
	.exists().withMessage('must be filled')
	.escape()

const price = check('price')
	.trim()
	.isDecimal()
	.toFloat()

const shippingPrice = check('shippingPrice')
	.trim()
	.isDecimal()
	.toFloat()

const stock = check('stock')
	.trim()
	.isInt({ min: 0 })
	.toInt()

const discount = check('discount')
	.trim()
	.isInt({ min: 0, max: 100 })
	.toInt()

export {
	productId,
	productKey,
	title,
	description,
	price,
	shippingPrice,
	stock,
	discount
}
