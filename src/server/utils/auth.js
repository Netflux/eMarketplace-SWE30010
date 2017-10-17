import Session from 'express-session'
import Passport from 'passport'
import LocalStrategy from 'passport-local'
import KnexSessionStore from 'connect-session-knex'
import Crypto from 'crypto'

import db from 'server/database'

const hashPassword = password => new Promise((resolve, reject) => {
	Crypto.randomBytes(16, (err, salt) => {
		if (err) { return reject(err) }
		Crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
			if (err) { return reject(err) }
			resolve(JSON.stringify({ salt: salt.toString('binary'), hash: key.toString('binary') }))
		})
	})
})

const verifyPassword = (password, combined) => new Promise((resolve, reject) => {
	const parsed = JSON.parse(combined)
	const salt = Buffer.from(parsed.salt, 'binary')
	const hash = Buffer.from(parsed.hash, 'binary')

	Crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
		if (err) { return reject(err) }
		resolve(key.toString() === hash.toString())
	})
})

// Helper functions for finding users based on ID or username
const findUserById = id => db('User').where('userId', id).first()
const findUserByUsername = username => db('User').where('username', username).first()

// Helper function to set up user authentication for API
const setupAuth = app => {
	// Setup session store
	const storeBuilder = KnexSessionStore(Session)
	const store = new storeBuilder({ knex: db })

	// Allow persistent sessions by providing serialize/deserialize methods for user accounts
	Passport.serializeUser((user, done) => done(null, user.userId))
	Passport.deserializeUser((id, done) => findUserById(id).asCallback((err, user) => {
		if (err) { return done(err) }
		done(null, user)
	}))

	// Setup the LocalStrategy for login authentication
	Passport.use(new LocalStrategy((username, password, done) => {
		findUserByUsername(username).asCallback((err, user) => {
			if (err || !user) { return done(null, false) }
			verifyPassword(password, user.password).then(res => {
				if (!res) { return done(null, false) }
				done(null, user)
			})
		})
	}))

	app.use(Session({
		cookie: {
			maxAge: 604800000 // Persist session cookie for 7 days
		},
		resave: false,
		saveUninitialized: false,
		secret: 'eMarketplace',
		store
	}))
	app.use(Passport.initialize())
	app.use(Passport.session())
}

export { setupAuth, hashPassword, verifyPassword }
