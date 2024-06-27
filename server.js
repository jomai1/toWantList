import express from 'express'
import cors from 'cors'
import tasks from './api/tasks.route.js'



console.log('Create app')
const app = express()

app.use(cors())
app.use(express.json())


// log every request
app.use('*', (req, res, next) => {
  console.log(req);
  next();
});

app.use("/api/v1/tasks", tasks)

app.use('*', (req, res) => {
  console.log("Not found")
  res.status(404).json({error: "not found"})
})

export default app