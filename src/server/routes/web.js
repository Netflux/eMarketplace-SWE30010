import Express from 'express'
import Path from 'path'

const router = Express.Router()

router.get('/*', (req, res) => {
	res.sendFile('index.html', { root: Path.join(__dirname, '../../../static') })
})

export default router
