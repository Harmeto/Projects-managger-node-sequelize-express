import { Router } from 'express'
import { createUser, getUser } from '../controllers/usersControllers.js'
const router = Router()

router.get('/', getUser)
router.post('/', createUser)

export default router
