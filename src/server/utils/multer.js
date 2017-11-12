import Multer from 'multer'
import Mime from 'mime-types'
import Crypto from 'crypto'

const multer = Multer({
	storage: Multer.diskStorage({
		destination: 'static/images/uploads',
		filename: (req, file, cb) => {
			Crypto.randomBytes(16, (err, bytes) => {
				cb(err, `${bytes.toString('hex')}${Date.now()}.${Mime.extension(file.mimetype)}`)
			})
		}
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
			return cb(null, false)
		}
		cb(null, true)
	}
})

export default multer
