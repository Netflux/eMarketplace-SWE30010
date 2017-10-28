import db from 'server/database'

const defaultProjection = [
	'Category.categoryId',
	'Category.title',
	'Category.imageUrl',
	'Category.bannerUrl'
]

const findAll = () => {
	return db('Category')
		.select(defaultProjection)
}

const create = category => {
	return db('Category')
		.insert(category)
}

const update = (categoryId, category) => {
	return db('Category')
		.where('categoryId', categoryId)
		.update(category)
}

const deleteOne = categoryId => {
	return db('Category')
		.where('categoryId', categoryId)
		.del()
}

export default {
	findAll,
	create,
	update,
	deleteOne
}
