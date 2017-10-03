exports.up = knex => {
	const createUserBasketTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS UserBasket (
			userId UNSIGNED INT NOT NULL,
			productKey VARCHAR(255) NOT NULL,
			quantity UNSIGNED INT NOT NULL,
			PRIMARY KEY (userId, productKey),
			FOREIGN KEY (userId) REFERENCES User(userId),
			FOREIGN KEY (productKey) REFERENCES Product(productKey)
		)
	`)

	return createUserBasketTable()
}

exports.down = knex => {
	const dropUserBasketTable = () => knex.schema.dropTable('UserBasket')

	return dropUserBasketTable()
}
