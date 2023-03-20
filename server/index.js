const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.listen(3030,()=>{
    console.log('server on 3030')
})