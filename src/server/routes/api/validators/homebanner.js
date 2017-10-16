import { check } from 'express-validator/check'

import db from 'server/database'

const homeBannerId = check('homeBannerId')
	.trim()
	.isInt({ min: 0 })
	.toInt()
	.custom(value => db('HomeBanner').where('homeBannerId', value).count('* AS count').then(rows => rows[0].count !== 0)).withMessage('must be a valid home banner')

export { homeBannerId }
