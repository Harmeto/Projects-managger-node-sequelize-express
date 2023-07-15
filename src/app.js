import express from 'express'
import cors from 'cors'

// localImport
import corsOptions from './config/cors.js'
import projectRoutes from './routes/projects.routes.js'
import taskRoutes from './routes/task.routes.js'
import credentials from './config/credentials.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// alowedOrigins
app.use(credentials)
// cors
app.use(cors(corsOptions))

app.use('/projects', projectRoutes)
app.use('/task', taskRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

export default app
