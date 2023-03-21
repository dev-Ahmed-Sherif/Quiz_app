const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/",(req,res)=> {
    res.send("hello")
})

router.get("/create",(req,res)=> {
    const user = new User({
        name:"Ahmed",
        password:"123",
        role:"admin",
        dateRegister : new Date()
    })
    user.save().then(()=>{

        res.send("user created")
    })
})

module.exports = router