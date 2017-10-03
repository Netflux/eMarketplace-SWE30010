exports.up = knex => {
	const createHomeBannerTable = () => knex.schema.raw(`
		CREATE TABLE IF NOT EXISTS \`Order\` (
			homeBannerId UNSIGNED INT AUTO_INCREMENT NOT NULL,
			userId UNSIGNED INT NOT NULL,
			imageUrl VARCHAR(255) NOT NULL,
			validFrom UNSIGNED INT NOT NULL,
			validTo UNSIGNED INT,
			PRIMARY KEY (homeBannerId, userId),
			FOREIGN KEY (userId) REFERENCES User(userId)
		)
	`)

	return createHomeBannerTable()
}

exports.down = knex => {
	const dropHomeBannerTable = () => knex.schema.dropTable('HomeBanner')

	return dropHomeBannerTable()
}
