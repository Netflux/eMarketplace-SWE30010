import Express from 'express'
//import Path from 'path'

const router = Express.Router()

router.get('/*', (req, res) => {
	// TODO - Enable once HTML files are added
	// res.sendFile('index.html', { root: Path.join(__dirname, '../../../static') })
	res.sendStatus(404)
})

export default router
