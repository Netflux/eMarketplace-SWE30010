import Express from 'express'

import userRouter from './users'
import productRouter from './products'

const router = Express.Router()

router.use('/users', userRouter)
router.use('/products', productRouter)

export default router
