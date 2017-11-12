require('app-module-path').addPath('src')
require('babel-register')

const migrations = {
	directory: './src/server/database/migrations',
	tableName: 'knex_migrations'
}

module.exports = {
	client: 'sqlite3',
	connection: {
		filename: './build/DB.sqlite3'
	},
	migrations: migrations,
	seeds: { directory: './src/server/database/seeds' },
	useNullAsDefault: true
}
