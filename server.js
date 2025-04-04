import express from "express";
const app = express();
import cors from "cors";
import connection from "./db/db.js";
import userRoute from "./routes/userRoute.js"
import taskRoute from "./routes/taskRoutes.js"
import authenticate from "./middlewares/authenticate.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(cookieParser()); // Cookie parser middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json()); // Middleware to parse JSON bodies



app.use("/user", userRoute)
// app.use("/user", authenticate, logoutRoute)
app.use("/task", authenticate, taskRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

connection().then(()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => console.log(error));