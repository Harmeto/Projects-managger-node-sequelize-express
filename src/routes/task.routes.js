import { Router } from 'express'
import { getTasks, createTask, getTask, deleteTask, updateTask, startTask, endTask, reStartTask } from '../controllers/taskController.js'
const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.get('/:id', getTask)

// admin Task

router.get('/:id/start', startTask)
router.get('/:id/end', endTask)
router.get('/:id/restart', reStartTask)

export default router
