const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./roots/auth")
const userRoute = require("./roots/users")
const PostRoute = require("./roots/usersPost")

// init to kee key safe 
dotenv.config()

// Connect mongoose
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,() =>{
    console.log("Connected to mongo");
});

// Middle-wares
app.use(express.json())
// app.use(helmet())
app.use(morgan("common"))

// middleware for routes
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/usersPost",PostRoute )

// // get request home
app.get("/",(req,res) => {
    res.send("welcome to homepage")
})

app.listen(5050,() => {
    console.log("sever is online")
})