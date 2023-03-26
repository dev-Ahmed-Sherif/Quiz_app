const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
    {
        academicYearId:{
            type:mongoose.Types.ObjectId,
            ref:"academicyears",
            require:true 
        },
        subjectId:{
            type:mongoose.Types.ObjectId,
            ref:"subjects",
            require:true 
        },
        questionIds:[{
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