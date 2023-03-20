

const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

const con =  require("./database/conn")

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))

app.listen(process.env.PORT || 7000,()=>{
    console.log('server on',process.env.PORT)
})