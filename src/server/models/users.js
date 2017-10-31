import db from 'server/database'
import { hashPassword } from 'server/utils/auth'

const defaultProjection = ['User.userId', 'User.username', 'User.createdAt']

const findOne = userId => {
	return findAll()
		.where('User.userId', userId)
		.first()
}

const findAll = (timestamp = 0) => {
	return db('User')
		.select(defaultProjection)
		.where('createdAt', '>=', timestamp)
		.orWhere('updatedAt', '>=', timestamp)
		.count('OrderProduct.productId as productsSold')
		.avg('ProductReview.rating as averageRating')
		.leftJoin('Product', 'Product.userId', 'User.userId')
		.leftJoin('OrderProduct', 'OrderProduct.productId', 'Product.productId')
		.leftJoin('ProductReview', 'ProductReview.productKey', 'Product.productKey')
		.groupBy('User.userId')
}

const create = user => {
	const timestamp = Date.now()
	return hashPassword(user.password)
		.then(hash => {
			return db('User').insert({
				...user,
				password: hash,
				createdAt: timestamp,
				updatedAt: timestamp
			})
		})
}

const update = (userId, user) => {
	return hashPassword(user.password)
		.then(hash => {
			return db('User')
				.where('userId', userId)
				.update({
					...user,
					password: hash,
					updatedAt: Date.now()
				})
		})
}

const deleteOne = userId => {
	return db('User')
		.where('userId', userId)
		.del()
}

export default {
	findOne,
	findAll,
	create,
	update,
	deleteOne
}
