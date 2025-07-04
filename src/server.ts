import { Server } from "http";
import app from "./app";

let server: Server
const PORT = 8000;

const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(
           "mongodb://TodosApp:h34tiiB7SVUOV5rF@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Connected to mongoDB")
        server = app.listen(PORT, () => {
          console.log(`App is listeing on port ${PORT}`);
        });
        
    } catch (error) {
        console.log(error)
    }
} 
main()