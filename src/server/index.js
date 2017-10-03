import Path from 'path'
import Express from 'express'
import Helmet from 'helmet'

import { apiRouter, webRouter } from './routes'

// Create a new instance of the Express application
const app = Express()
const port = process.env.PORT || 3000

// Setup static content folder
app.use(Express.static(Path.join(__dirname, '../../static')))

// Enable Helmet middleware to set security-related HTTP headers
app.use(Helmet())

// Setup routes of the Express application
app.use('/api', apiRouter)
app.use('/', webRouter)

// Start the Express application on the specified port
app.listen(port, err => {
	if (err) return console.error(err)
	console.log(`eMarketplace listening on port ${port}.`)
})
