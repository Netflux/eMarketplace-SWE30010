exports.up = knex => {
	const createOrderTable = () => knex.schema.createTable('Order', table => {
		table.increments('orderId').unsigned().notNullable()
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.integer('date').unsigned().notNullable()
	})
	const createOrderProductTable = () => knex.schema.createTable('OrderProduct', table => {
		table.integer('orderId').unsigned().notNullable().references('orderId').inTable('Order')
		table.integer('productId').unsigned().notNullable().references('productId').inTable('Product')
		table.integer('quantity').unsigned().notNullable()
		table.string('status').notNullable()
		table.primary(['orderId', 'productId'])
	})

	return createOrderTable().then(createOrderProductTable)
}

exports.down = knex => {
	const dropOrderProductTable = () => knex.schema.dropTable('OrderProduct')
	const dropOrderTable = () => knex.schema.dropTable('Order')

	return dropOrderProductTable().then(dropOrderTable)
}
