import app from './server.js' 
import mongodb from "mongodb" 
import dotenv from "dotenv"
import TasksDAO from './dao/tasksDAO.js' 

dotenv.config()

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 8000
let databasesList
let error = []

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log("\n")

    return databasesList.databases? true: false
};



async function main(){ 
  const client = new mongodb.MongoClient(
    uri
  )

try {
  console.log(`Connect to MongoDB cluster on: ${uri}`)
  await client.connect()


  if(!await listDatabases(client)){
    error.push('no_db')
  }


  if(!error.length){
    console.log("Injecting into db ")
    await TasksDAO.injectDB(client)

  
    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    })  
  }else{
    console.log("No db in cluster")
  }
  
  } catch (e) { 
      console.error(e); 
      error.push(e)
      process.exit(1)

  }
}
main().catch(console.error);