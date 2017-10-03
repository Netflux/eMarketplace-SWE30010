const migrations = {
	directory: './src/server/database/migrations',
	tableName: 'knex_migrations'
}

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './build/dev.sqlite3'
		},
		migrations: migrations,
		useNullAsDefault: true
	},
	production: {
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'eMarketplaceDB'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: migrations
	}
}
