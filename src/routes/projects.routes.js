import { Router } from 'express'
import { getProjects, createProject, deleteProject, getProject, updateProject, getProjectTasks } from '../controllers/projectsController.js'
const router = Router()

router.get('/', getProjects)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)
router.get('/:id', getProject)
router.get('/:id/task', getProjectTasks)

export default router
