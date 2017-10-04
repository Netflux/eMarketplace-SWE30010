import Express from 'express'

import userRouter from './users'

const router = Express.Router()

router.use('/users', userRouter)

export default router
