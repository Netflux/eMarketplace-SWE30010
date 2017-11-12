exports.up = knex => {
	const createUserBasketTable = () => knex.schema.createTable('UserBasket', table => {
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.string('productKey').notNullable().references('productKey').inTable('Product')
		table.integer('quantity').unsigned().notNullable()
		table.integer('createdAt').unsigned().notNullable()
		table.integer('updatedAt').unsigned().notNullable()
		table.primary(['userId', 'productKey'])
	})

	return createUserBasketTable()
}

exports.down = knex => {
	const dropUserBasketTable = () => knex.schema.dropTable('UserBasket')

	return dropUserBasketTable()
}
