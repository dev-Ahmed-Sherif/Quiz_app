const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type:String,
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

subject = mongoose.model("subjects",subjectSchema);
module.exports = subject