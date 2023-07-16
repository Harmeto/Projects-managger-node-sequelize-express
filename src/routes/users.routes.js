import { Router } from 'express'
import { createUser, getUser, loginUser } from '../controllers/usersControllers.js'
const router = Router()

router.get('/', getUser)
router.post('/', createUser)
router.post('/login', loginUser)

export default router
