import { Router } from 'express'
import { getTasks, createTask, getTask, deleteTask, updateTask } from '../controllers/taskController.js'
const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.get('/:id', getTask)

export default router
