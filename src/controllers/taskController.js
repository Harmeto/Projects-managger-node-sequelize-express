import { Task } from '../models/Task.js'

export const getTasks = async (_, res) => {
  try {
    const task = await Task.findAll()
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTask = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.findOne({ where: { id: `${id}` } })
    if (task) return res.status(200).json(task)
    throw new Error('Task not Found')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createTask = async (_, res) => {
  try {
    const { name, projectId, description } = _.body
    if (name && projectId) {
      await Task.create({
        name, projectId, description
      })
      return res.status(201).json({ message: 'Task created' })
    }
    throw new Error('Invalids Fields')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (_, res) => {
  try {
    const { id } = _.params
    const { name, done, projectId } = _.body
    if (name || projectId || done) {
      const task = await Task.findOne({ where: { id } })
      await Task.update({ name, done, projectId }, { where: { id: `${id}` } })
      if (task) return res.status(202).json({ message: 'Task updated' })
      throw new Error('Task Not Found')
    }
    throw new Error('Missing fields')
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const deleteTask = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.destroy({ where: { id: `${id}` } })
    if (task) return res.status(202).json({ message: 'Task deleted' })
    throw new Error('Task Not Found')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const startTask = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.update({ startDate: Date.now(), onProgress: true }, { where: { id } })
    if (task) return res.status(200).json({ message: 'Task beggin' })
    throw new Error('cannot update task, try again!')
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const endTask = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.update({ endDate: Date.now(), onProgress: false, done: true }, { where: { id } })
    if (task) return res.status(200).json({ message: 'Task done' })
    throw new Error('cannot update task, try again!')
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const reStartTask = async (_, res) => {
  try {
    const { id } = _.params
    const task = await Task.update({ endDate: null, onProgress: true, done: false }, { where: { id } })
    if (task) return res.status(200).json({ message: 'Task returned to work' })
    throw new Error('cannot update task, try again!')
  } catch (error) {
    res.status(500).json(error.message)
  }
}
