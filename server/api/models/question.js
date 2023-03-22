const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type:String,
            require:true
        },
        options : {
            type:Array,
            require:true
        },
        answers:{
            type:Array,
            require:true
        },
        dateAdded: {
            type:String
        }
    },
    {
        versionKey:false,
        strict:false
    }
)

question = mongoose.model("questions",questionSchema);
module.exports = question