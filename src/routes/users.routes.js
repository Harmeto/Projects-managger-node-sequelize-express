import { Router } from 'express'
import { createUser, getUsers, loginUser, refreshToken, logoutUser } from '../controllers/usersControllers.js'
const router = Router()

router.get('/', getUsers)
router.post('/', createUser)
router.post('/login', loginUser)
router.post('/refresh', refreshToken)
router.post('/logout', logoutUser)

export default router
