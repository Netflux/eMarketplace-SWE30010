exports.up = knex => {
	const createHomeBannerTable = () => knex.schema.createTable('HomeBanner', table => {
		table.increments('homeBannerId').unsigned().notNullable()
		table.integer('userId').unsigned().notNullable().references('userId').inTable('User')
		table.string('imageUrl').notNullable()
		table.integer('validFrom').unsigned().notNullable()
		table.integer('validTo').unsigned()
	})

	return createHomeBannerTable()
}

exports.down = knex => {
	const dropHomeBannerTable = () => knex.schema.dropTable('HomeBanner')

	return dropHomeBannerTable()
}
