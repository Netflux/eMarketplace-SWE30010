exports.up = knex => {
	const createProductTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS Product (
			productId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			productKey VARCHAR(255) NOT NULL,
			userId UNSIGNED INT NOT NULL,
			title VARCHAR(255) NOT NULL,
			description VARCHAR(255) NOT NULL,
			price DECIMAL NOT NULL,
			shippingPrice DECIMAL NOT NULL,
			stock UNSIGNED INT NOT NULL,
			discount UNSIGNED INT NOT NULL,
			validFrom UNSIGNED INT NOT NULL,
			validTo UNSIGNED INT,
			PRIMARY KEY (productId, productKey, userId),
			FOREIGN KEY (userId) REFERENCES User(userId)
		)
	`)
	const createProductImageTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS ProductImage (
			productImageId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			productKey VARCHAR(255) NOT NULL,
			imageUrl VARCHAR(255) NOT NULL,
			validFrom UNSIGNED INT NOT NULL,
			validTo UNSIGNED INT,
			PRIMARY KEY (productImageId, productKey),
			FOREIGN KEY (productKey) REFERENCES Product(productKey)
		)
	`)
	const createProductCategoryTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS ProductCategory (
			productCategoryId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			productKey VARCHAR(255) NOT NULL,
			title VARCHAR(255) NOT NULL,
			imageUrl VARCHAR(255) NOT NULL,
			validFrom UNSIGNED INT NOT NULL,
			validTo UNSIGNED INT,
			PRIMARY KEY (productCategoryId, productKey),
			FOREIGN KEY (productKey) REFERENCES Product(productKey)
		)
	`)
	const createProductReviewTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS ProductReview (
			productKey VARCHAR(255) NOT NULL,
			userId UNSIGNED INT NOT NULL,
			title VARCHAR(255) NOT NULL,
			description VARCHAR(255) NOT NULL,
			rating UNSIGNED TINYINT NOT NULL,
			date UNSIGNED INT NOT NULL,
			PRIMARY KEY (productKey, userId),
			FOREIGN KEY (productKey) REFERENCES Product(productKey),
			FOREIGN KEY (userId) REFERENCES User(userId)
		)
	`)

	return createProductTable()
		.then(createProductImageTable)
		.then(createProductCategoryTable)
		.then(createProductReviewTable)
}

exports.down = knex => {
	const dropProductReviewTable = () => knex.schema.dropTable('ProductReview')
	const dropProductCategoryTable = () => knex.schema.dropTable('ProductCategory')
	const dropProductImageTable = () => knex.schema.dropTable('ProductImage')
	const dropProductTable = () => knex.schema.dropTable('Product')

	return dropProductReviewTable()
		.then(dropProductCategoryTable)
		.then(dropProductImageTable)
		.then(dropProductTable)
}
