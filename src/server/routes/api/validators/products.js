import { check } from 'express-validator/check'

import db from 'server/database'
import { categoryId } from './categories'

const productId = check('productId')
	.trim()
	.isInt({ min: 0 })
	.toInt()

const productKey = check('productKey')
	.trim()
	.matches(/^[A-Za-z0-9_-]+$/)
	.escape()
	.custom(value => db('Product').where('productKey', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid product')

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
	categoryId,
	productKey,
	title,
	description,
	price,
	shippingPrice,
	stock,
	discount
}
