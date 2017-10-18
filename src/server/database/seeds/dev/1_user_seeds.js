import { hashPassword } from 'server/auth'

exports.seed = knex => {
	return knex('User').del()
		.then(() => hashPassword('12345678'))
		.then(hash => knex('User').insert([{
			userId: 1,
			username: 'administrator',
			password: hash,
			email: 'root@root.com',
			newsletter: 0,
			role: 'Administrator'
		},{
			userId: 2,
			username: 'victor',
			password: hash,
			email: 'root@root.com',
			newsletter: 0,
			role: 'Administrator'
		},{
			userId: 3,
			username: 'kevin',
			password: hash,
			email: 'root@root.com',
			newsletter: 0,
			role: 'Administrator'
		}]))
		.then(() => knex('UserAddress').insert([{
			userId: 1,
			name: 'administrator',
			street: 'Street',
			city: 'City',
			state: 'State',
			zip: 12345,
			phone: +60123456789
		},{
			userId: 2,
			name: 'victor',
			street: 'Street',
			city: 'City',
			state: 'State',
			zip: 12345,
			phone: +60123456789
		},{
			userId: 3,
			name: 'kevin',
			street: 'Street',
			city: 'City',
			state: 'State',
			zip: 12345,
			phone: +60123456789
		}]))
}
