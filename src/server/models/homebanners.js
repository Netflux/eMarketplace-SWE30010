import db from 'server/database'

const defaultProjection = [
	'HomeBanner.homeBannerId',
	'HomeBanner.userId',
	'HomeBanner.imageUrl'
]

const findAll = () => {
	return db('HomeBanner')
		.select(defaultProjection)
		.whereNull('validTo')
}

const create = homeBanner => {
	return db('HomeBanner')
		.insert(homeBanner)
}

const deleteOne = homeBannerId => {
	return db('HomeBanner')
		.where('homeBannerId', homeBannerId)
		.whereNull('validTo')
		.update('validTo', Date.now())
}

export default {
	findAll,
	create,
	deleteOne
}
