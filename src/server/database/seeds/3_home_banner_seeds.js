exports.seed = knex => {
	return knex('HomeBanner').del()
		.then(() => knex('HomeBanner').insert({
			userId: 1,
			imageUrl: '/images/banner.jpg',
			validFrom: Date.now()
		}))
}
