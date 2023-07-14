import express from 'express'
import projectRoutes from './routes/projects.routes.js'
import taskRoutes from './routes/task.routes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/projects', projectRoutes)
app.use('/task', taskRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

export default app
