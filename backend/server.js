const express = require('express');
const app = express();
const cors = require('cors');
const {connection} = require("./db/db");
const userRouter = require('./routes/userRoute');
const logoutRoute = require('./routes/userRoute');
const notesRouter = require("./routes/noteRoutes");
const {authenticate} = require("./middlewares/authenticate")
const cookieParser = require('cookie-parser');
require('dotenv').config()

const PORT = 3001;


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/user", userRouter)
app.use("/user", authenticate, logoutRoute)
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