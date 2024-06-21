import dotenv from "dotenv"
import { ObjectId } from 'mongodb';

dotenv.config()

const collection = process.env.TASK_COLLECTION
const db = process.env.TASKS_DB

let tasks

export default class TasksDAO{
   static async injectDB(conn){
        if(tasks){
            return
      } 
      try{
        tasks = await conn.db(db) 
                  .collection(collection)

        console.log("Connected to tasks ")
      }
      catch(e){
        console.error(`unable to connect in TasksDAO: ${e}`) 
      }
    } 

    static async getTasks({
        filters = null,
      } = {}){
          let query

          console.log("filters")
          console.log(filters)

          if(filters){
              if("category" in filters){
                  query = { category: filters['category'] }; // Using exact match for category
          }else if("user" in filters){
              query = { user: filters['user'] };                
          }else if("rated" in filters){
              query = { rated: { $eq: Number(filters['rated'])}};
          }else if("title" in filters){
              query = { title: filters['title'] };                
          }else if("_id" in filters){
            if(ObjectId.isValid(filters['_id'])){
              query = { _id: new ObjectId(filters['_id'])};
            }else{
              query = { _id: id };
            }
          }
          }

          let cursor

          console.log(`Trying to find tasks with query`)
          console.log(query)

          try{
              cursor = await tasks.find(query)
              const tasksList = await cursor.toArray()
              const totalNumTasks = await tasks.countDocuments(query)
              console.log(`Tasks list: ${tasksList}, totalNumbTasks: ${totalNumTasks}`)
              return {tasksList, totalNumTasks} 
              }
      catch(e){
      console.error(`Unable to issue find command, ${e}`) 
      return { tasksList: [], totalNumTasks: 0}
      } 
    }
    static async addTask(){}
    static async updateTask(){}
    static async deleteTask(){}
  }

