const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            require:true
        },
        password : {
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true
        },
        dateRegister: {
            type:String
        }
    },
    {
        versionKey:false,
        strict:false
    }
)

user = mongoose.model("User",userSchema);
module.exports = user