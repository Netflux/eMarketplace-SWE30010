import Express from 'express'

import basketRouter from './basket'
import categoryRouter from './categories'
import homeBannerRouter from './homebanners'
import orderRouter from './orders'
import productRouter from './products'
import userRouter from './users'

const router = Express.Router()

router.use('/basket', basketRouter)
router.use('/categories', categoryRouter)
router.use('/homebanners', homeBannerRouter)
router.use('/orders', orderRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)

export default router
