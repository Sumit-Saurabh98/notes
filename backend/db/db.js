import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const connection = async () =>{
 try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB");
 } catch (error) {
    console.log("Couldn't connect to MongoDB: " + error)
 }
}

export default connection;