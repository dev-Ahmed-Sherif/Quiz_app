

const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

const con =  require("./database/conn")

const userRouter = require("./api/routes/userRoutes")
const questionRouter = require("./api/routes/questionRoutes")

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/ques",questionRouter)

app.listen(process.env.PORT || 7000,()=>{
    console.log('server on',process.env.PORT)
})