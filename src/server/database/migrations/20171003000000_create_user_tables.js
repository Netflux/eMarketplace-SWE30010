exports.up = knex => {
	const createUserTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS User (
			userId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			username VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			newsletter UNSIGNED TINYINT NOT NULL,
			role UNSIGNED TINYINT NOT NULL,
			PRIMARY KEY (userId)
		)
	`)
	const createUserAddressTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS UserAddress (
			userId UNSIGNED INT NOT NULL,
			name VARCHAR(255) NOT NULL,
			street VARCHAR(255) NOT NULL,
			city VARCHAR(255) NOT NULL,
			state VARCHAR(255) NOT NULL,
			zip VARCHAR(255) NOT NULL,
			phone VARCHAR(255) NOT NULL,
			PRIMARY KEY (userId),
			FOREIGN KEY (userId) REFERENCES User(userId)
		)
	`)

	return createUserTable().then(createUserAddressTable)
}

exports.down = knex => {
	const dropUserAddressTable = () => knex.schema.dropTable('UserAddress')
	const dropUserTable = () => knex.schema.dropTable('User')

	return dropUserAddressTable().then(dropUserTable)
}
