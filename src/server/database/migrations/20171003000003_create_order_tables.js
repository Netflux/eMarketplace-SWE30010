exports.up = knex => {
	const createOrderTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS \`Order\` (
			orderId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			userId UNSIGNED INT NOT NULL,
			date UNSIGNED INT NOT NULL,
			PRIMARY KEY (orderId, userId),
			FOREIGN KEY (userId) REFERENCES User(userId)
		)
	`)
	const createOrderProductTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS OrderProduct (
			orderId UNSIGNED INT NOT NULL,
			productId UNSIGNED INT NOT NULL,
			quantity UNSIGNED INT NOT NULL,
			status VARCHAR(255) NOT NULL,
			PRIMARY KEY (orderId, productId),
			FOREIGN KEY (orderId) REFERENCES \`Order\`(orderId),
			FOREIGN KEY (productId) REFERENCES Product(productId)
		)
	`)

	return createOrderTable().then(createOrderProductTable)
}

exports.down = knex => {
	const dropOrderProductTable = () => knex.schema.dropTable('OrderProduct')
	const dropOrderTable = () => knex.schema.dropTable('Order')

	return dropOrderProductTable().then(dropOrderTable)
}
