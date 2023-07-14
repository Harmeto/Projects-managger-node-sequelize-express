import { Project } from '../models/Project.js'
import { Task } from '../models/Task.js'

export const getProjects = async (_, res) => {
  try {
    const projects = await Project.findAll()
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: `ERROR: ${error.message}` })
  }
}

export const getProject = async (_, res) => {
  try {
    const { id } = _.params
    const project = await Project.findOne({ where: { id: `${id}` } })
    if (project) return res.status(200).json(project)
    throw new Error('Project not Found')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createProject = async (_, res) => {
  try {
    const { name, priority, description } = _.body

    await Project.create({
      name, description, priority
    })

    res.status(201).json({ message: `Project ${name} created` })
  } catch (error) {
    res.status(500).json({ message: `ERROR: ${error.message}` })
  }
}

export const updateProject = async (_, res) => {
  try {
    const { id } = _.params
    const { name, priority, description } = _.body
    if (name || priority || description) {
      const project = await Project.findOne({ where: { id } })
      await Project.update({ name, priority, description }, { where: { id: `${id}` } })
      if (project) return res.status(202).json({ message: 'Project updated' })
      throw new Error('Project not found')
    }
    throw new Error('Missing fields')
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const deleteProject = async (_, res) => {
  try {
    const { id } = _.params
    const project = await Project.destroy({ where: { id: `${id}` } })
    if (project) return res.status(200).json({ message: `Project n° ${id} was deleted` })
    throw new Error('Project not found')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getProjectTasks = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.findAll({
      where: { projectId: id }
    })
    if (task.length > 0) return res.status(200).json(task)
    throw new Error('Project not Found or Project doenst have Tasks')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
