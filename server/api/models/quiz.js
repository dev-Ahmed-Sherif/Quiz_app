const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            require:true
        },
        subjectId:{
            type:mongoose.Types.ObjectId,
            ref:"subjects",
            require:true 
        },
        questionId:[{
            type:mongoose.Types.ObjectId,
            ref:"questions",
            require:true
        }],
        dateAdded: {
            type:String
        }
    },
    {
        versionKey:false,
        strict:false
    }
)

quiz = mongoose.model("quizzes",quizSchema);
module.exports = quiz