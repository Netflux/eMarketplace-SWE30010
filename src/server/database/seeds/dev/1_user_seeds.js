import { hashPassword } from 'server/utils/auth'

exports.seed = knex => {
	return knex('User').del()
		.then(() => hashPassword('12345678'))
		.then(hash => knex('User').insert({
			userId: 1,
			username: 'administrator',
			password: hash,
			email: 'root@root.com',
			newsletter: 0,
			role: 'Administrator',
			createdAt: Date.now()
		}))
		.then(() => knex('UserAddress').insert({
			userId: 1,
			name: 'administrator',
			street: 'Street',
			city: 'City',
			state: 'State',
			zip: 12345,
			phone: +60123456789
		}))
}
