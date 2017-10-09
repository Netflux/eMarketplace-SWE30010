import Express from 'express'

import basketRouter from './basket'
import productRouter from './products'
import userRouter from './users'

const router = Express.Router()

router.use('/basket', basketRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)

export default router
