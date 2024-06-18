import express from 'express'
import cors from 'cors'
import tasks from './api/tasks.route.js'


console.log('Create app')
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/tasks", tasks)

app.use('*', (req, res) => {
  res.status(404).json({error: "not found"})
})

export default app