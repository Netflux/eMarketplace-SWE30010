import Path from 'path'
import Express from 'express'
import Helmet from 'helmet'
import BodyParser from 'body-parser'

import { setupAuth } from './auth'
import { apiRouter, webRouter } from './routes'

// Create a new instance of the Express application
const app = Express()
const port = process.env.PORT || 3000

// Setup static content folder
app.use(Express.static(Path.join(__dirname, '../../static')))

// Enable parsing of application/json request body
app.use(BodyParser.json())

// Enable Helmet middleware to set security-related HTTP headers
app.use(Helmet())

// Setup authentication module for Express application
setupAuth(app)

// Setup routes of the Express application
app.use('/api', apiRouter)
app.use('/', webRouter)

// Start the Express application on the specified port
app.listen(port, err => {
	if (err) { return console.error(err) }
	console.log(`eMarketplace listening on port ${port}.`)
})
