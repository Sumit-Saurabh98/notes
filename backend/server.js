const express = require('express');
const app = express();
const cors = require('cors');
const {connection} = require("./db/db");
const userRouter = require('./routes/userRoute');
const notesRouter = require("./routes/noteRoutes");
const {authenticate} = require("./middlewares/authenticate")
const cookieParser = require('cookie-parser');
require('dotenv').config()

const PORT = process.env.PORT || 8080;

app.use(cookieParser()); // Cookie parser middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json()); // Middleware to parse JSON bodies



app.use("/user", userRouter)
// app.use("/user", authenticate, logoutRoute)
app.use("/notes", authenticate, notesRouter)

app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

connection().then(()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => console.log(error));