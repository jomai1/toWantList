import TasksDAO from '../dao/tasksDAO.js' 

export default class TasksController{
    static async apiGetTasks(req,res,next){
    	console.log("Req query")
    	console.log(req.query)

        let filters = {} 
        if(req.query.category){
            filters.category = req.query.category 
        }else if(req.query.user){ 
            filters.user = req.query.user
        }else if(req.query.rated){
        	filters.rated = req.query.rated
        }else if(req.query.title){
        	filters.title = req.query.title
        }else if(req.query._id){
            filters._id = req.query._id
        }

        console.log("Filters for get Tasks")
        console.log(filters)

        const { tasksList, totalNumTasks } = await TasksDAO.getTasks({
            	filters,
        })

        let response = {
            tasks: tasksList,
            filters: filters, 
            total_results: totalNumTasks
        }
        res.json(response)
    }

    static async apiPostTasks(req,res,next){
        try{
            const task = req.body.task
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const TaskResponse = await TasksDAO.addTask( 
                userInfo,
                task,
                new Date()
            )
            res.json({ status: "success "}) 
         }catch(e){
             res.status(500).json({ error: e.message})
         }
    }

    static async apiUpdateTasks(req,res,next){
        console.log("Post")
        console.log("Req query")
        console.log(req.query)

        try{
           const TaskResponse = await TasksDAO.updateTask( 
               req.body.user_id, 
               req.body.task,
               new Date()
           )

           var { error } = TaskResponse
           if(error){
               res.status.json({error})
           }

           if(TaskResponse.modifiedCount === 0){
            throw new Error ("unable to update task. User may not be original poster")
           }
           res.json({ status: "success "}) 
        }catch(e){
            res.status(500).json({ error: e.message})
        }
    }

    static async apiDeleteTasks(req,res,next){
        console.log("Delete")
        console.log("Req query")
        console.log(req.query)

        try{
           const userId = req.body.user_id
           const TaskResponse = await TasksDAO.deleteTask( 
               taskId,
               userId, 
           )
           
           res.json({ status: "success "}) 
        }catch(e){
            res.status(500).json({ error: e.message})
        }
    }

}