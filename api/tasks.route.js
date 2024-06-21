import express from 'express'
import TasksController from './tasks.controller.js'

const router = express.Router()


router.route('/').get(TasksController.apiGetTasks)
router
  .route("/review") 
  .post(TasksController.apiPostTasks) 
  .put(TasksController.apiUpdateTasks) 
  .delete(TasksController.apiDeleteTasks)

export default router