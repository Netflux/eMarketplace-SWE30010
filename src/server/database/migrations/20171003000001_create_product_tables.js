exports.up = knex => {
	const createCategoryTable = () => knex.schema.createTable('Category', table => {
		table.increments('categoryId').unsigned().notNullable()
		table.string('title').notNullable()
		table.string('imageUrl').notNullable()
		table.integer('validFrom').unsigned().notNullable()
		table.integer('validTo').unsigned()
	})
	const createProductTable = () => knex.schema.createTable('Product', table => {
		table.increments('productId').unsigned().notNullable()
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.integer('categoryId').unsigned().notNullable().references('categoryId').inTable('Category')
		table.string('productKey').notNullable()
		table.string('title').notNullable()
		table.text('description', 'mediumtext').notNullable()
		table.decimal('price').notNullable()
		table.decimal('shippingPrice').notNullable()
		table.integer('discount').unsigned().notNullable()
		table.integer('validFrom').unsigned().notNullable()
		table.integer('validTo').unsigned()
	})
	const createProductStockTable = () => knex.schema.createTable('ProductStock', table => {
		table.string('productKey').notNullable().references('productKey').inTable('Product')
		table.integer('stock').unsigned().notNullable()
		table.primary('productKey')
	})
	const createProductImageTable = () => knex.schema.createTable('ProductImage', table => {
		table.increments('productImageId').unsigned().notNullable()
		table.string('productKey').notNullable().references('productKey').inTable('Product')
		table.string('imageUrl').notNullable()
		table.integer('validFrom').unsigned().notNullable()
		table.integer('validTo').unsigned()
	})
	const createProductReviewTable = () => knex.schema.createTable('ProductReview', table => {
		table.string('productKey').notNullable().references('productKey').inTable('Product')
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.string('title').notNullable()
		table.text('description').notNullable()
		table.integer('rating').unsigned().notNullable()
		table.integer('date').unsigned().notNullable()
		table.primary(['productKey', 'userId'])
	})

	return createProductTable()
		.then(createCategoryTable)
		.then(createProductStockTable)
		.then(createProductImageTable)
		.then(createProductReviewTable)
}

exports.down = knex => {
	const dropProductReviewTable = () => knex.schema.dropTable('ProductReview')
	const dropProductImageTable = () => knex.schema.dropTable('ProductImage')
	const dropProductStockTable = () => knex.schema.droppTable('ProductStock')
	const dropProductTable = () => knex.schema.dropTable('Product')
	const dropCategoryTable = () => knex.schema.dropTable('Category')

	return dropProductReviewTable()
		.then(dropProductReviewTable)
		.then(dropProductImageTable)
		.then(dropProductStockTable)
		.then(dropProductTable)
		.then(dropCategoryTable)
}
