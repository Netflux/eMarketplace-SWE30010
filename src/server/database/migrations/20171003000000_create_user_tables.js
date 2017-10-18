exports.up = knex => {
	const createUserTable = () => knex.schema.createTable('User', table => {
		table.increments('userId').unsigned().notNullable()
		table.string('username').notNullable()
		table.string('password').notNullable()
		table.string('email').notNullable()
		table.integer('newsletter').unsigned().notNullable()
		table.integer('role').unsigned().notNullable()
		table.integer('createdAt').unsigned().notNullable()
		table.unique(['username', 'email'])
	})
	const createUserAddressTable = () => knex.schema.createTable('UserAddress', table => {
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.string('name').notNullable()
		table.string('street').notNullable()
		table.string('city').notNullable()
		table.string('state').notNullable()
		table.string('zip').notNullable()
		table.string('phone').notNullable()
		table.primary('userId')
	})

	return createUserTable().then(createUserAddressTable)
}

exports.down = knex => {
	const dropUserAddressTable = () => knex.schema.dropTable('UserAddress')
	const dropUserTable = () => knex.schema.dropTable('User')

	return dropUserAddressTable().then(dropUserTable)
}
