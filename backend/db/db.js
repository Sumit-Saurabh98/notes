const mongoose = require("mongoose")
require("dotenv").config()

const connection = async () =>{
 try {
    await mongoose.connect("mongodb+srv://sumitsaurabh112:sumitsaurabh112@cluster0.ihgmy45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to MongoDB");
 } catch (error) {
    console.log("Couldn't connect to MongoDB: " + error)
 }
}

module.exports = {connection}