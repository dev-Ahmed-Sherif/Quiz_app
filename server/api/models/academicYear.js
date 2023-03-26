const mongoose = require("mongoose");

const academicyearSchema = new mongoose.Schema(
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

academicyear = mongoose.model("academicyears",academicyearSchema);
module.exports = academicyear