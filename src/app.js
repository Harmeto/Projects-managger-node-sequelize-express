import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'

// localImport
import corsOptions from './config/cors.js'
import projectRoutes from './routes/projects.routes.js'
import taskRoutes from './routes/task.routes.js'
import userRoutes from './routes/users.routes.js'
import credentials from './config/credentials.js'
import authentication from './middlewares/authentication.js'

configDotenv()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// alowedOrigins
app.use(credentials)
// cors
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(authentication)

app.use('/projects', projectRoutes)
app.use('/task', taskRoutes)
app.use('/user', userRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

export default app
